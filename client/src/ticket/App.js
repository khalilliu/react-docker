import React, { useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import { h0 } from '../common/fp';
import { TrainContext } from './context';
import useNav from '../common/useNav';
import Header from '../common/Header';
import Nav from '../common/Nav';
import Detail from '../common/Detail';
import Loading from '../common/Loading';

import Candidate from './Candidate';
import Schedule from './Schedule';

import './App.css';
import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setDepartDate,
  setSearchParsed,
  setDepartTimeStr,
  setArriveTimeStr,
  setArriveDate,
  setDurationStr,
  setTickets,
  prevDate,
  nextDate,
  toggleIsScheduleVisible
} from './actions';

const App = props => {
  const {
    departDate,
    arriveDate,
    departStation,
    arriveStation,
    trainNumber,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,

    dispatch
  } = props;
  const onBack = useCallback(() => {
    window.history.go(-1);
  }, []);

  // parse state from window.location
  useEffect(() => {
    // {aStation: "南京", dStation: "北京", trainNumber: "Z281", date: "2019-02-10"}
    const { aStation, dStation, trainNumber, date } = URI.parseQuery(
      window.location.search
    );
    // console.log(queries);
    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setDepartDate(dayjs(date).valueOf()));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setSearchParsed(true));
  }, []);

  // set document title
  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber]);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI('/rest/ticket')
      .search({
        date: dayjs(departDate).format('YYYY-MM-DD'),
        trainNumber
      })
      .toString();
    console.log(url);

    //get data
    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        const { detail, candidates } = result;

        const {
          arriveDate,
          arriveTimeStr,
          departTimeStr,
          durationStr
        } = detail;

        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setTickets(candidates));
      });
  }, [searchParsed, departDate, trainNumber]);

  // use-nav fn
  console.log(departDate);
  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  );
  console.log(isPrevDisabled);

  //查看时刻表
  const detailCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleIsScheduleVisible
      },
      dispatch
    );
  }, []);

  if (!searchParsed) {
    return null;
  }

  return (
    <div className='app'>
      <div className='header-wrapper'>
        <Header title={trainNumber} onBack={onBack}></Header>
      </div>
      <div className='nav-wrapper'>
        <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}
        ></Nav>
      </div>
      <div className='detail-wrapper'>
        <Detail
          toggleIsScheduleVisible={() => detailCbs.toggleIsScheduleVisible()}
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          departStation={departStation}
          arriveStation={arriveStation}
          durationStr={durationStr}
        ></Detail>
      </div>
      <TrainContext.Provider
        value={{ trainNumber, departStation, arriveStation, departDate }}
      >
        <Candidate tickets={tickets}></Candidate>
      </TrainContext.Provider>
      {isScheduleVisible && (
        <div
          className='mask'
          onClick={() => dispatch(toggleIsScheduleVisible())}
        >
          <Suspense
            fallback={
              <div>
                <Loading />
              </div>
            }
          >
            <Schedule
              date={departDate}
              trainNumber={trainNumber}
              departStation={departStation}
              arriveStation={arriveStation}
            ></Schedule>
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default connect(
  state => state,
  dispatch => ({ dispatch })
)(App);
