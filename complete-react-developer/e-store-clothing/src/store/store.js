import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; //INFO not necessary but help see how store works

import { rootReducer } from './root-reducer';

// INFO for logger
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
