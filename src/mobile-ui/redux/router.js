import { AsyncStorage } from 'react-native';
import { createSelector } from 'reselect';
import { ScreenVisibilityListener } from 'react-native-navigation';
import { onLocationChanged } from 'connected-react-router/lib/actions';
import { Screens } from '../screens';

const { getIn, toJS } = require('connected-react-router/lib/structure/plain').default;

const navigators = {};
let appConfig;
let history;

const indexOf = (arr, test, def = 0) => {
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    if (test(arr[i])) {
      return i;
    }
  }
  return def;
};

export const findTab = screen => indexOf(appConfig.tabs, tab => tab.screen === screen, -1);

const routeSelector = createSelector(
  pathname => pathname,
  pathname => {
    let match;
    let screen;
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    const screenValues = Object.values(Screens);
    for (let idx = 0; idx < screenValues.length; idx += 1) {
      screen = screenValues[idx];
      match = screen.route.exec(pathname);
      if (match) break;
    }
    if (match) {
      if (screen.routeParam) {
        return {
          ...screen,
          routeParamValue: match[match.length - 1],
        };
      }
      return screen;
    }
    return undefined;
  }
);

export const applyInitialLocation = async () => {
  const { pathname } = history.location;
  const [, tab] = pathname ? pathname.split('/') : [0, ''];
  const tabName = `tab.${tab}`;
  const initialTab = indexOf(appConfig.tabs, t => t.screen === tabName);
  if (initialTab !== -1) {
    const [tabSpec] = appConfig.tabs.splice(initialTab, 1);
    appConfig.tabs.splice(0, 0, tabSpec);
  }
};

export const registerNavigator = (rootView, navigator) => {
  navigators[rootView] = navigator;
  return () => {
    delete navigators[rootView];
  };
};

export const navigator = rootView => {
  if (rootView) {
    return navigators[rootView];
  }
  return Object.values(navigators)[0];
};

export const getScreen = location => {
  const screen = routeSelector((location || history.location).pathname);
  return {
    ...screen,
  };
};
export const getScreenAt = (delta = -1) => {
  const previousLocation = history.entries[history.index + delta];
  if (previousLocation) {
    return getScreen(previousLocation);
  }
  return {
    title: 'Back',
  };
};

/*
  * ConnectedRouter listens to a history object passed from props.
  * When history is changed, it dispatches action to redux store.
  * Then, store will pass props to component to render.
  * This creates uni-directional flow from history->store->router->components.
  */
export const connectedRouter = (store, instanceHistory, instanceAppConfig) => {
  let inTimeTravelling = false;
  history = instanceHistory;
  appConfig = instanceAppConfig;

  const listener = new ScreenVisibilityListener({
    didAppear: ({ screen }) => {
      const [type] = screen.split('.');
      if (type !== 'tab') {
        return;
      }
      const { location } = history;
      // TODO: validation
      AsyncStorage.setItem('Navigator.lastScreen', JSON.stringify(location));
    },
  });
  listener.register();

  store.subscribe(() => {
    // Extract store's location
    const {
      pathname: pathnameInStore,
      search: searchInStore,
      hash: hashInStore,
      state: stateInStore,
    } = toJS(getIn(store.getState(), ['router', 'location']));

    // Extract history's location
    const {
      pathname: pathnameInHistory,
      search: searchInHistory,
      hash: hashInHistory,
    } = history.location;

    // If we do time travelling, the location in store is changed but location in history is not changed
    if (
      pathnameInHistory !== pathnameInStore ||
      searchInHistory !== searchInStore ||
      hashInHistory !== hashInStore
    ) {
      inTimeTravelling = true;
      // Update history's location to match store's location
      history.push({
        pathname: pathnameInStore,
        search: searchInStore,
        hash: hashInStore,
        state: {
          ...stateInStore,
          previousPathname: history.location.pathname,
        },
      });
    }
  });

  const historyHandler = (location, action) => {
    // Dispatch onLocationChanged except when we're in time travelling
    let originalPathname = location.state.previousPathname;

    if (!inTimeTravelling) {
      originalPathname = store.getState().router.location.pathname;
      store.dispatch(onLocationChanged(location, action));
    } else {
      inTimeTravelling = false;
      delete location.state.previousPathname; // eslint-disable-line no-param-reassign
    }

    const screen = routeSelector(location.pathname);
    if (!screen) {
      throw new Error(`RouterError: unable to screen for route ${location.pathname}`);
    }

    const a = originalPathname.split('/');
    const b = location.pathname.split('/');
    const end = Math.min(a.length, b.length);
    let lcr;
    for (lcr = 0; lcr < end; lcr += 1) {
      if (a[lcr] !== b[lcr]) {
        break;
      }
    }

    const [tt, ...views] = screen.name.split('/');
    const [type, screenTab] = tt.split('.');
    const [, tab] = b;
    const nav = navigator(tab);
    if (!nav) {
      throw new Error(`RouterError: unable to resolve route ${location.pathname}`);
    }
    const tabIndex = findTab(`tab.${tab}`);
    if (tabIndex === -1) {
      throw new Error(`Unable to find tab for ${location.pathname}`);
    }
    if (lcr < 2) {
      nav.switchToTab({
        tabIndex,
      });
    }
    if (lcr < a.length && lcr > 1) {
      if (action === 'POP') {
        nav.pop({
          animated: true,
          animationType: 'slide-horizontal',
        });
      } else {
        // eslint-disable-next-line no-console
        console.warn('TODO: resetTo', lcr, a.length);
      }
    }
    if (type === 'view') {
      for (let i = lcr; i < b.length; i += 1) {
        const view = `view.${screenTab}/${views.slice(0, i).join('/')}`;
        const options = location.state.options || {};
        nav.push({
          screen: view,
          passProps: {
            [screen.routeParam]: screen.routeParamValue,
          },
          ...options,
        });
      }
    }
  };
  history.listen(historyHandler);

  // inTimeTravelling = true;
  // historyHandler(history.location, 'INIT');
};
