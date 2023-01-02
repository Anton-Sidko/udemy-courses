import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger'; //INFO not necessary but help see how store works

import { rootReducer } from './root-reducer';

// INFO how middleware works
// const loggerMiddleware = store => next => action => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log('type: 🎄', action.type);
//   console.log('payload: 🎄', action.payload);
//   console.log('currentState: 🎄', store.getState());

//   next(action);

//   console.log('nextState: 🎄', store.getState());
// };

// INFO for logger
// const middleWares = [loggerMiddleware];
const middleWares = [logger];

// INFO Redux persist config
const persistConfig = {
  key: 'root',
  storage,
  blackList: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
