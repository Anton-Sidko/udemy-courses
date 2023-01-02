import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger'; //INFO not necessary but help see how store works
// import { loggerMiddleware } from './middleware/logger';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

// INFO for logger, thunk
// const middleWares = [loggerMiddleware];
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  thunk,
].filter(Boolean);

// INFO Redux persist config
const persistConfig = {
  key: 'root',
  storage,
  // blackList: ['user', 'categories'] // INFO don't persist it,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// INFO config for Redux Devtools works
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
