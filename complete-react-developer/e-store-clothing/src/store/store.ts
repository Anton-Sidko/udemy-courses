import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger'; //INFO not necessary but help see how store works
// import { loggerMiddleware } from './middleware/logger';
// INFO SAGA replace THUNK
// import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

// INFO for logger, thunk, saga
// const middleWares = [loggerMiddleware];
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  // thunk,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

// INFO Redux persist config

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
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

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);