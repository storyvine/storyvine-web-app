import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'modules/rootSaga';
import rootReducer from 'modules/rootReducer';

const persistConfig = {
  key: 'you-persist-key',
  storage,
  whitelist: ['user'],
};

const sagaMiddleware = createSagaMiddleware(rootSaga);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistCombineReducers(persistConfig, rootReducer),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
const persistor = persistStore(store);

export default { persistor, store };

sagaMiddleware.run(rootSaga);

/**
 * Register async loaded reducers in store and replace
 * current state-reducer with the a new reducer
 *
 * @export
 * @param {Object} store - the store object
 * @param {Object} asyncReducer - async reducer modules
 */
store.asyncReducers = {};

function replaceReducers(defaultReducers) {
  const merged = Object.assign({}, defaultReducers, store.asyncReducers);
  const combined = combineReducers(merged);
  store.replaceReducer(combined);
}

export function injectAsyncReducers(asyncReducers) {
  const injectReducers = Object.keys(asyncReducers).reduce((all, item) => {
    if (store.asyncReducers[item]) {
      delete all[item];
    }

    return all;
  }, asyncReducers);

  store.asyncReducers = Object.assign({}, store.asyncReducers, injectReducers);
  replaceReducers(rootReducer);
}

// hot reloading for reducers
if (module.hot) {
  module.hot.accept('../modules/rootReducer', () => {
    const nextReducer = require("../modules/rootReducer").default; // eslint-disable-line

    replaceReducers(nextReducer);
  });
}
