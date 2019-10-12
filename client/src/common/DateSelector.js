import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { h0 } from './fp';
import Header from './Header';

import './DateSelector.css';

const Day = ({ day, onSelect }) => {
  if (!day) {
    return <td className='null'></td>;
  }

  const classes = [];

  const now = h0();

  if (day < now) {
    classes.push('disabled');
  }

  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push('weekend');
  }

  const dateString = now === day ? '今天' : new Date(day).getDate();

  return (
    <td className={classnames(classes)} onClick={() => onSelect(day)}>
      {dateString}
    </td>
  );
};

Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired
};

const Week = ({ days, onSelect }) => (
  <tr className='date-table-days'>
    {days.map((day, idx) => (
      <Day key={idx} day={day} onSelect={onSelect}></Day>
    ))}
  </tr>
);

Week.propTypes = {
  days: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

const Month = ({ onSelect, startingTimeInMonth }) => {
  const startDay = new Date(startingTimeInMonth);
  const currentDay = new Date(startingTimeInMonth);

  let days = [];

  // 同一个月
  while (currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }
  // 从周一开始排列
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
    .fill(null)
    .concat(days);

  const lastDay = new Date(days[days.length - 1]);

  days = days.concat(
    new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null)
  );

  const weeks = [];

  for (let row = 0; row < days.length / 7; row++) {
    const week = days.slice(row * 7, (row + 1) * 7);
    weeks.push(week);
  }

  return (
    <table className='date-table'>
      <thead>
        <tr>
          <td colSpan='7'>
            <h5>{`${startDay.getFullYear()}年${startDay.getMonth() + 1}月`}</h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className='date-table-weeks'>
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className='weekend'>周六</th>
          <th className='weekend'>周日</th>
        </tr>
        {weeks.map((week, idx) => {
          return <Week key={idx} days={week} onSelect={onSelect}></Week>;
        })}
      </tbody>
    </table>
  );
};

Month.propTypes = {
  startingTimeInMonth: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

const DateSelector = props => {
  const { onBack, onSelect, show } = props;

  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(1); // 每个月的1号

  const monthSequence = [now.getTime()];

  now.setMonth(now.getMonth() + 1); //下一个月
  monthSequence.push(now.getTime());

  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());

  return (
    <div className={classnames('date-selector', { hidden: !show })}>
      <Header title='日期选择' onBack={onBack}></Header>
      <div className='date-selector-tables'>
        {monthSequence.map(month => {
          return (
            <Month
              key={month}
              onSelect={onSelect}
              startingTimeInMonth={month}
            ></Month>
          );
        })}
      </div>
    </div>
  );
};

DateSelector.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default DateSelector;
