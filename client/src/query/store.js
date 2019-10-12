import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import { h0 } from '../common/fp';
import { ORDER_DEPART } from './constants';

// middlewares
const logger = createLogger({});
const middlewares = [thunk, logger];
// apply redux middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

// initial state
const initialState = {
  from: null,
  to: null,
  departDate: h0(Date.now()),
  highSpeed: false,
  trainList: [],
  orderType: ORDER_DEPART,
  onlyTickets: false,
  ticketTypes: [],
  checkedTicketTypes: {},
  trainTypes: [],
  checkedTrainTypes: {},
  departStations: [],
  checkedDepartStations: {},
  arriveStations: [],
  checkedArriveStations: {},
  departTimeStart: 0,
  departTimeEnd: 24,
  arriveTimeStart: 0,
  arriveTimeEnd: 24,
  isFiltersVisible: false,
  searchParsed: false
};

export default createStore(
  combineReducers(reducers),
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);
