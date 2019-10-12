import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

const logger = createLogger();
const middlewares = [thunk, logger];
// apply redux middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const initialState = {
  departDate: Date.now(),
  arriveDate: Date.now(),
  departStation: null,
  arriveStation: null,
  trainNumber: null,
  departTimeStr: null,
  arriveTimeStr: null,
  durationStr: null,
  tickets: [],
  isScheduleVisible: false,
  searchParsed: false
};

export default createStore(
  combineReducers(reducers),
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);
