import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';

import history from './history';
import reducers from './reducers';
import mockData from './mock';
import webtorrentMiddleware from './webtorrent/middleware';

const DEVTOOLS = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
const composeEnhancers = global[DEVTOOLS] || compose;
// const loggerIncludes = new Set([
//   actions.ExplorerSyncObjects,
// ]);
const logger = createLogger({
  predicate: () => true, // loggerIncludes.has(action.type);
});

export default function configureStore(initialState) {
  const enhancers = composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(history), webtorrentMiddleware, logger)
  );
  const rootReducer = connectRouter(history)(reducers);

  const store = initialState
    ? createStore(rootReducer, initialState, enhancers)
    : createStore(rootReducer, enhancers);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(connectRouter(history)(nextRootReducer));
    });
  }

  return store;
}

export const store = configureStore(Object.assign({}, mockData));
