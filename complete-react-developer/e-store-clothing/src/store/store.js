import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger'; //INFO not necessary but help see how store works
// import { loggerMiddleware } from './middleware/logger';

import { rootReducer } from './root-reducer';

// INFO for logger
// const middleWares = [loggerMiddleware];
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(
  Boolean
);

// INFO Redux persist config
const persistConfig = {
  key: 'root',
  storage,
  blackList: ['user'],
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
