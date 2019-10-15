import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import URI from 'urijs';
import { bindActionCreators } from 'redux';

import './App.css';

import {
  setTrainNumber,
  setDepartDate,
  setDepartStation,
  setArriveStation,
  setSeatType,
  setSearchParsed,
  fetchInitial,
  // for passengers
  createAdult,
  createChild,
  removePassenger,
  updatePassenger,
  hideMenu,
  showGenderMenu,
  showFollowAdultMenu,
  showTicketTypeMenu
} from './actions';
import Headers from '../common/Header';
import Detail from '../common/Detail';
import Ticker from './Ticket';
import Passengers from './Passengers';
import Menu from './Menu';
import Choose from './Choose';
import Account from './Account';

const App = props => {
  const {
    trainNumber,
    searchParsed,
    departStation,
    arriveStation,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    seatType,

    passengers,
    menu,
    isMenuVisible,

    dispatch
  } = props;
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);

    const { trainNumber, dStation, aStation, type, date } = queries;
    dispatch(setTrainNumber(trainNumber));
    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setSeatType(type));
    dispatch(setDepartDate(dayjs(date).valueOf()));
    dispatch(setSearchParsed(true));
  }, []);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI('/rest/order')
      .search({
        dStation: departStation,
        aStation: arriveStation,
        type: seatType,
        date: dayjs(departDate).format('YYYY-MM-DD')
      })
      .toString();
    console.log(url);
    dispatch(fetchInitial(url));
  }, [searchParsed, departStation, arriveStation, seatType, departDate]);

  const passengersCbs = useMemo(() => {
    return bindActionCreators(
      {
        createAdult,
        createChild,
        removePassenger,
        updatePassenger,
        showGenderMenu,
        showFollowAdultMenu,
        showTicketTypeMenu
      },
      dispatch
    );
  }, []);

  const menuCbs = useMemo(() => {
    return bindActionCreators(
      {
        hideMenu
      },
      dispatch
    );
  }, []);

  const chooseCbs = useMemo(() => {
    return bindActionCreators(
      {
        updatePassenger
      },
      dispatch
    );
  }, []);

  const onBack = () => {
    window.history.go(-1);
  };

  if (!searchParsed) return null;

  return (
    <div className='app'>
      <div className='header-wrapper'>
        <Headers title='订单填写' onBack={onBack}></Headers>
      </div>
      <div className='detail-wrapper'>
        <Detail
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          departStation={departStation}
          arriveStation={arriveStation}
          durationStr={durationStr}
          hasChildren={true}
        >
          <p className='train-name'>{trainNumber}</p>
          <span style={{ display: 'block' }} className='train-icon'></span>
          <p className='train-time'>耗时{durationStr}</p>
        </Detail>
      </div>
      <Ticker price={price} type={seatType}></Ticker>
      <Passengers passengers={passengers} {...passengersCbs}></Passengers>
      {passengers.length > 0 && (
        <Choose passengers={passengers} {...chooseCbs}></Choose>
      )}
      <Account length={passengers.length} price={price}></Account>
      <Menu show={isMenuVisible} {...menu} {...menuCbs}></Menu>
    </div>
  );
};

export default connect(
  state => state,
  dispatch => ({ dispatch })
)(App);
