/** @format */

import React, { useCallback, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './App.css';

import Header from '../common/Header';
import AddressForm from './AddressForm';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Submit from './Submit';

import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';

// actions
import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setCityData,
  setSelectedCity,
  showDateSelector,
  setDepartDate,
  hideDateSelector,
  toggleHighSpeed
} from './actions';
import { h0 } from '../common/fp';

function App(props) {
  const {
    from,
    to,
    isCitySelectorVisible,
    isDateSelectorVisible,
    cityData,
    isLoadingCityData,
    highSpeed,
    dispatch,
    departDate
  } = props;

  // AddressFrom callbacks
  const formHandlers = useMemo(() => {
    return bindActionCreators({ exchangeFromTo, showCitySelector }, dispatch);
  }, []);

  // citySelector callbacks
  const citySelectorHandlers = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchCityData,
        onSelect: setSelectedCity
      },
      dispatch
    );
  }, []);

  // departDate callbacks
  const departDateHandlers = useMemo(() => {
    return bindActionCreators({ onClick: showDateSelector }, dispatch);
  }, []);

  // dateSelector callbacks
  const dateSelectorHandlers = useMemo(() => {
    return bindActionCreators({ onBack: hideDateSelector }, dispatch);
  }, []);

  const onSelectDate = useCallback(day => {
    if (!day) return;
    if (day < h0()) {
      return;
    }
    dispatch(setDepartDate(day));
    dispatch(hideDateSelector());
  }, []);

  // toggle highSpeed
  const highSpeedHandlers = useMemo(() => {
    return bindActionCreators(
      {
        toggle: toggleHighSpeed
      },
      dispatch
    );
  }, []);

  const onBack = useCallback(() => {
    window.history.go(-1);
  }, []);
  return (
    <div>
      <div className='header-wrapper'>
        <Header title='火车票' onBack={onBack} />
      </div>
      <form action='./query.html' className='form'>
        <AddressForm from={from} to={to} {...formHandlers} />
        <DepartDate time={departDate} {...departDateHandlers} />
        <HighSpeed highSpeed={highSpeed} {...highSpeedHandlers} />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorHandlers}
      ></CitySelector>
      <DateSelector
        show={isDateSelectorVisible}
        onSelect={onSelectDate}
        {...dateSelectorHandlers}
      ></DateSelector>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
