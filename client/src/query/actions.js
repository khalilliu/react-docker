import {
  ORDER_DEPART,
  ORDER_DURATION,
  // actionTypes
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_TRAIN_LIST,
  ACTION_SET_ORDER_TYPE,
  ACTION_SET_ONLY_TICKETS,
  ACTION_SET_TICKET_TYPES,
  ACTION_SET_CHECKED_TICKET_TYPES,
  ACTION_SET_TRAIN_TYPES,
  ACTION_SET_CHECKED_TRAIN_TYPES,
  ACTION_SET_DEPART_STATIONS,
  ACTION_SET_CHECKED_DEPART_STATIONS,
  ACTION_SET_ARRIVE_STATIONS,
  ACTION_SET_CHECKED_ARRIVE_STATIONS,
  ACTION_SET_DEPART_TIME_START,
  ACTION_SET_DEPART_TIME_END,
  ACTION_SET_ARRIVE_TIME_START,
  ACTION_SET_ARRIVE_TIME_END,
  ACTION_SET_IS_FILTERS_VISIBLE,
  ACTION_SET_SEARCH_PARSED
} from './constants';

import { h0 } from '../common/fp';

export const setFrom = from => {
  return {
    type: ACTION_SET_FROM,
    payload: from
  };
};

export const setTo = to => {
  return {
    type: ACTION_SET_TO,
    payload: to
  };
};

export const setDepartDate = time => {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: time
  };
};

export const setHighSpeed = highSpeed => {
  return {
    type: ACTION_SET_HIGH_SPEED,
    payload: highSpeed
  };
};

export const setSearchParsed = searchParsed => {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed
  };
};

export const prevState = () => (dispatch, getState) => {
  const { departDate } = getState();
  dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
};

export const nextState = () => (dispatch, getState) => {
  const { departDate } = getState();
  dispatch(setDepartDate(h0(departDate) + 86400 * 1000)); // 后一天
};

export const setTrainList = trainList => {
  return {
    type: ACTION_SET_TRAIN_LIST,
    payload: trainList
  };
};
export const setTicketTypes = ticketTypes => {
  return {
    type: ACTION_SET_TICKET_TYPES,
    payload: ticketTypes
  };
};
export const setTrainTypes = trainTypes => {
  return {
    type: ACTION_SET_TRAIN_TYPES,
    payload: trainTypes
  };
};
export const setDepartStations = departStations => {
  return {
    type: ACTION_SET_DEPART_STATIONS,
    payload: departStations
  };
};
export const setArriveStations = arriveStations => {
  return {
    type: ACTION_SET_ARRIVE_STATIONS,
    payload: arriveStations
  };
};

export const toggleOrderType = () => (dispatch, getState) => {
  const { orderType } = getState();
  if (orderType === ORDER_DEPART) {
    dispatch({
      type: ACTION_SET_ORDER_TYPE,
      payload: ORDER_DURATION
    });
  } else {
    dispatch({
      type: ACTION_SET_ORDER_TYPE,
      payload: ORDER_DEPART
    });
  }
};
export const toggleHighSpeed = () => (dispatch, getState) => {
  const { highSpeed } = getState();
  dispatch(setHighSpeed(!highSpeed));
};
export const toggleOnlyTickets = () => (dispatch, getState) => {
  const { onlyTickets } = getState();
  dispatch({
    type: ACTION_SET_ONLY_TICKETS,
    payload: !onlyTickets
  });
};
export const toggleIsFiltersVisible = () => (dispatch, getState) => {
  const { isFiltersVisible } = getState();
  dispatch({
    type: ACTION_SET_IS_FILTERS_VISIBLE,
    payload: !isFiltersVisible
  });
};
export const setCheckedTicketTypes = checkedTicketTypes => {
  return {
    type: ACTION_SET_CHECKED_TICKET_TYPES,
    payload: checkedTicketTypes
  };
};
export const setCheckedTrainTypes = checkedTrainTypes => {
  return {
    type: ACTION_SET_CHECKED_TRAIN_TYPES,
    payload: checkedTrainTypes
  };
};
export const setCheckedDepartStations = checkedDepartStations => {
  return {
    type: ACTION_SET_CHECKED_DEPART_STATIONS,
    payload: checkedDepartStations
  };
};
export const setCheckedArriveStations = checkedArriveStations => {
  return {
    type: ACTION_SET_CHECKED_ARRIVE_STATIONS,
    payload: checkedArriveStations
  };
};
export const setDepartTimeStart = departTimeStart => {
  return {
    type: ACTION_SET_DEPART_TIME_START,
    payload: departTimeStart
  };
};
export const setDepartTimeEnd = departTimeEnd => {
  return {
    type: ACTION_SET_DEPART_TIME_END,
    payload: departTimeEnd
  };
};
export const setArriveTimeStart = arriveTimeStart => {
  return {
    type: ACTION_SET_ARRIVE_TIME_START,
    payload: arriveTimeStart
  };
};
export const setArriveTimeEnd = arriveTimeEnd => {
  return {
    type: ACTION_SET_ARRIVE_TIME_END,
    payload: arriveTimeEnd
  };
};
