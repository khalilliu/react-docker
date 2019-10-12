import React, { useMemo, memo } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import './Detail.css';

const Detail = memo(props => {
  const {
    departStation,
    arriveStation,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    trainNumber,
    durationStr,

    toggleIsScheduleVisible
  } = props;

  const departDateStr = useMemo(() => format(departDate), [departDate]);
  const arriveDateStr = useMemo(() => format(arriveDate), [arriveDate]);

  return (
    <div className='detail'>
      <div className='content'>
        <div className='left'>
          <p className='city'>{departStation}</p>
          <p className='time'>{departTimeStr}</p>
          <p className='date'>{departDateStr}</p>
        </div>
        <div className='middle'>
          <p className='train-name'>{trainNumber}</p>
          <p className='train-mid'>
            <span className='left'></span>
            <span className='schedule' onClick={toggleIsScheduleVisible}>
              时刻表
            </span>
            <span className='right'></span>
          </p>
          <p className='train-time'>耗时{durationStr}</p>
        </div>
        <div className='right'>
          <p className='city'>{arriveStation}</p>
          <p className='time'>{arriveTimeStr}</p>
          <p className='date'>{arriveDateStr}</p>
        </div>
      </div>
    </div>
  );
});

function format(d) {
  const date = dayjs(d);
  return date.format('MM-DD') + ' ' + date.locale('zh-cn').format('ddd');
}

export default Detail;
