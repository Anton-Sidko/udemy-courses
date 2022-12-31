import { compose, createStore, applyMiddleware } from 'redux';
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

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
