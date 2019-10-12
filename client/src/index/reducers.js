import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
  ACTION_SET_CITY_DATA,
  ACTION_SET_IS_LOADING_CITY_DATA,
  ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_DEPART_DATE
} from './constants';

export default {
  from(state = '北京', action) {
    switch (action.type) {
      case ACTION_SET_FROM:
        return action.payload;
      default:
        return state;
    }
  },
  to(state = '上海', action) {
    switch (action.type) {
      case ACTION_SET_TO:
        return action.payload;
      default:
        return state;
    }
  },
  isCitySelectorVisible(state = false, action) {
    switch (action.type) {
      case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
        return action.payload;
      default:
        return state;
    }
  },
  currentSelectingLeftCity(state = false, action) {
    switch (action.type) {
      case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
        return action.payload;
      default:
        return state;
    }
  },
  cityData(state = null, action) {
    switch (action.type) {
      case ACTION_SET_CITY_DATA:
        return action.payload;
      default:
        return state;
    }
  },
  isLoadingCityData(state = false, action) {
    switch (action.type) {
      case ACTION_SET_IS_LOADING_CITY_DATA:
        return action.payload;
      default:
        return state;
    }
  },
  isDateSelectorVisible(state = false, action) {
    switch (action.type) {
      case ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
        return action.payload;
      default:
        return state;
    }
  },
  departDate(state = Date.now(), action) {
    switch (action.type) {
      case ACTION_SET_DEPART_DATE:
        return action.payload;
      default:
        return state;
    }
  },
  highSpeed(state = false, action) {
    switch (action.type) {
      case ACTION_SET_HIGH_SPEED:
        return action.payload;
      default:
        return state;
    }
  }
};
