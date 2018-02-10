import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const DEVTOOLS = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
const composeEnhancers = global[DEVTOOLS] || compose;
// const loggerIncludes = new Set([
//   actions.ExplorerSyncObjects,
// ]);
const logger = createLogger({
  predicate: () => true, // loggerIncludes.has(action.type);
});

export default function configureStore(initialState) {
  const enhancers = composeEnhancers(applyMiddleware(logger));

  const store = initialState
    ? createStore(reducers, initialState, enhancers)
    : createStore(reducers, enhancers);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export const store = configureStore(Object.assign({}, require('./mock')));
