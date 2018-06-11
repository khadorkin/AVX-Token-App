import { createStore as createReduxStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';

import reducers from './reducers';
import mockData from './mock';
import mockVideos from './mockVideos';
import webtorrentMiddleware from './webtorrent/middleware';

const DEVTOOLS = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
const composeEnhancers = global[DEVTOOLS] || compose;
// const loggerIncludes = new Set([
//   actions.ExplorerSyncObjects,
// ]);
const logger = createLogger({
  duration: true,
  collapsed: true,
  stateTransformer: () => '',
  actionTransformer: ({ type }) => ({ type }),
});

let store;

export const createStore = history => {
  const enhancers = composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(history), webtorrentMiddleware, logger)
  );
  const rootReducer = connectRouter(history)(reducers);

  const initialState = Object.assign(
    {
      videosList: {
        videos: mockVideos,
      },
    },
    mockData
  );

  store = initialState
    ? createReduxStore(rootReducer, initialState, enhancers)
    : createReduxStore(rootReducer, enhancers);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(connectRouter(history)(nextRootReducer));
    });
  }

  return store;
};

export const getStore = () => {
  if (!store) {
    throw new Error('Store was not initialized');
  }
  return store;
};
