import { h0 } from '../common/fp';

import {
  ACTION_SET_DEPART_DATE,
  ACTION_SET_ARRIVE_DATE,
  ACTION_SET_ARRIVE_TIME_STR,
  ACTION_SET_DEPART_TIME_STR,
  ACTION_SET_DEPART_STATION,
  ACTION_SET_ARRIVE_STATION,
  ACTION_SET_TRAIN_NUMBER,
  ACTION_SET_DURATION_STR,
  ACTION_SET_TICKETS,
  ACTION_SET_IS_SCHEDULE_VISIBLE,
  ACTION_SET_SEARCH_PARSED
} from './constants';

export const setDepartStation = departStation => ({
  type: ACTION_SET_DEPART_STATION,
  payload: departStation
});
export const setArriveStation = arriveStation => ({
  type: ACTION_SET_ARRIVE_STATION,
  payload: arriveStation
});
export const setTrainNumber = trainNumber => ({
  type: ACTION_SET_TRAIN_NUMBER,
  payload: trainNumber
});
export const setDepartDate = departState => ({
  type: ACTION_SET_DEPART_DATE,
  payload: departState
});

export const setSearchParsed = parsed => {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: parsed
  };
};

export const setDepartTimeStr = departTimeStr => {
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload: departTimeStr
  };
};
export const setArriveTimeStr = arriveTimeStr => {
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload: arriveTimeStr
  };
};
export const setArriveDate = arriveDate => {
  return {
    type: ACTION_SET_ARRIVE_DATE,
    payload: arriveDate
  };
};
export const setDurationStr = durationStr => {
  return {
    type: ACTION_SET_DURATION_STR,
    payload: durationStr
  };
};
export const setTickets = tickets => {
  return {
    type: ACTION_SET_TICKETS,
    payload: tickets
  };
};

export const nextDate = () => (dispatch, getState) => {
  const { departDate } = getState();

  dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
};

export const prevDate = () => (dispatch, getState) => {
  const { departDate } = getState();

  dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
};

export function setIsScheduleVisible(isScheduleVisible) {
  return {
    type: ACTION_SET_IS_SCHEDULE_VISIBLE,
    payload: isScheduleVisible
  };
}

export const toggleIsScheduleVisible = () => (dispatch, getState) => {
  const { isScheduleVisible } = getState();
  dispatch(setIsScheduleVisible(!isScheduleVisible));
};
