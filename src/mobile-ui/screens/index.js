/* eslint-disable import/prefer-default-export */
/* eslint-disable global-require */
/* eslint-disable no-param-reassign */
import { Navigation } from 'react-native-navigation';

export const Screens = {
  'view.video/detail': {
    component: () => require('./videos/Detail').default,
    route: '/(video|trending)/:movieId',
  },
  'tab.video': {
    component: () => require('./videos/List').default,
    route: '/video',
    title: 'Videos',
  },
  'tab.trending': {
    component: () => require('./videos/Trending').default,
    route: '/trending',
    title: 'Trending',
  },
  'tab.wallet': {
    component: () => require('./wallet/Wallet').default,
    route: '/wallet',
    title: 'Wallet',
  },
  'tab.preferences': {
    component: () => require('./prefs/Preferences').default,
    route: '/preferences',
    title: 'Preferences',
  },
};
Object.keys(Screens).forEach(name => {
  const screen = Screens[name];
  const repl = m => {
    screen.routeParam = m.slice(1);
    return '([^/]+)';
  };
  screen.route = new RegExp(`^${screen.route.replace(/:[^/]+/, repl)}$`);
  screen.name = name;
});

export function registerScreens(store, { ScreenProvider }) {
  Object.values(Screens).forEach(screen => {
    Navigation.registerComponent(screen.name, screen.component, store, ScreenProvider);
  });

  // Parts
  Navigation.registerComponent(
    'structure.DrawerButton',
    () => require('./_global/TitlebarButton').DrawerButton
  );
  Navigation.registerComponent(
    'structure.BackButton',
    () => require('./_global/TitlebarButton').BackButton
  );
  Navigation.registerComponent('structure.Titlebar', () => require('./_global/TitleBar'));
  Navigation.registerComponent(
    'structure.Drawer',
    () => require('./drawer/Drawer').default,
    store,
    ScreenProvider
  );
}
