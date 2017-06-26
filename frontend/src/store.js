/**
 * Redux Store
 * @see http://redux.js.org/docs/api/Store.html (EN)
 *
 * Redux Persist
 * @see https://github.com/rt2zz/redux-persist
 */
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localforage';
import reducers from './reducers/index';
import middlewares from './middlewares/index';
import config from '../config/index';

const composers = compose(
  applyMiddleware(...middlewares),
  autoRehydrate(),
  /**
   * If you turn on redux-devtools, should install redux-devtools chrome extension
   * https://github.com/zalmoxisus/redux-devtools-extension
   * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
   */
  config.devTools && window.devToolsExtension ? window.devToolsExtension() : f => f,
);
const store = createStore(reducers, undefined, composers);
persistStore(store, {
  // Add reducer name that has to be exclude from persist.
  whitelist: ['locale'],
  storage: localForage,
});

export default store;
