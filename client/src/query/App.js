import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import URI from 'urijs';
import { bindActionCreators } from 'redux';

import { h0 } from '../common/fp';
import Header from '../common/Header';
import Nav from '../common/Nav';
import List from './List';
import Bottom from './Bottom';

import useNav from '../common/useNav';

import {
  // parse html
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  setSearchParsed,
  nextState,
  prevState,
  // query
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,
  // filters
  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleIsFiltersVisible,
  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd
} from './actions';

import './App.css';

const App = props => {
  const {
    from,
    to,
    departDate,
    highSpeed,
    trainList,
    orderType,
    onlyTickets,
    ticketTypes,
    checkedTicketTypes,
    trainTypes,
    checkedTrainTypes,
    departStations,
    checkedDepartStations,
    arriveStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    isFiltersVisible,
    searchParsed,
    dispatch
  } = props;
  // init state
  useEffect(() => {
    const { from, to, date, highSpeed } = URI.parseQuery(
      window.location.search
    );
    dispatch(setFrom(from));
    dispatch(setTo(to));
    dispatch(setDepartDate(h0(dayjs(date).valueOf())));
    dispatch(setHighSpeed(highSpeed === 'true'));

    dispatch(setSearchParsed(true));
  }, []);

  // get list data
  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI('/rest/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed', highSpeed)
      .setSearch('orderType', orderType)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch(
        'checkedTicketTypes',
        Object.keys(checkedTicketTypes).join('') || ''
      )
      .setSearch(
        'checkedTrainTypes',
        Object.keys(checkedTrainTypes).join('') || ''
      )
      .setSearch(
        'checkedDepartStations',
        Object.keys(checkedDepartStations).join('') || ''
      )
      .setSearch(
        'checkedArriveStations',
        Object.keys(checkedArriveStations).join('') || ''
      )
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd)
      .toString();

    fetch(url)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: { ticketType, trainType, depStation, arrStation }
            }
          }
        } = result;

        dispatch(setTrainList(trains));
        dispatch(setTicketTypes(ticketType));
        dispatch(setTrainTypes(trainType));
        dispatch(setDepartStations(depStation));
        dispatch(setArriveStations(arrStation));
      });
  }, [
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  ]);

  const onBack = useCallback(() => {
    window.history.go(-1);
  }, []);

  // use-nav fn
  console.log(departDate);
  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevState,
    nextState
  );
  console.log(isPrevDisabled);

  const bottomHandlers = useMemo(() => {
    return bindActionCreators(
      {
        toggleOrderType,
        toggleHighSpeed,
        toggleOnlyTickets,
        toggleIsFiltersVisible,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd
      },
      dispatch
    );
  }, []);

  return (
    <div>
      <div className='header-wrapper'>
        <Header title={`${from} ⇀ ${to}`} onBack={onBack}></Header>
      </div>
      <Nav
        date={departDate}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        prev={prev}
        next={next}
      ></Nav>
      <List list={trainList}></List>
      <Bottom
        highSpeed={highSpeed}
        orderType={orderType}
        onlyTickets={onlyTickets}
        isFiltersVisible={isFiltersVisible}
        ticketTypes={ticketTypes}
        trainTypes={trainTypes}
        departStations={departStations}
        arriveStations={arriveStations}
        checkedTicketTypes={checkedTicketTypes}
        checkedTrainTypes={checkedTrainTypes}
        checkedDepartStations={checkedDepartStations}
        checkedArriveStations={checkedArriveStations}
        departTimeStart={departTimeStart}
        departTimeEnd={departTimeEnd}
        arriveTimeStart={arriveTimeStart}
        arriveTimeEnd={arriveTimeEnd}
        {...bottomHandlers}
      ></Bottom>
    </div>
  );
};

export default connect(
  state => state,
  dispatch => ({ dispatch })
)(App);
