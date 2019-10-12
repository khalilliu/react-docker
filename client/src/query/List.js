import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs';

import './List.css';

const ListItem = props => {
  const {
    dTime,
    aTime,
    dayAfter,
    aStation,
    dStation,
    trainNumber,
    date,
    time,
    priceMsg
  } = props;

  const url = useMemo(() => {
    return new URI('ticket.html')
      .search({ aStation, dStation, trainNumber, date })
      .toString();
  }, [aStation, dStation, trainNumber, date]);
  return (
    <li className='list-item'>
      <a href={url}>
        <span className='item-time'>
          <em>{dTime}</em>
          <br />
          <em className='em-light'>
            {aTime} <i className='time-after'>{dayAfter}</i>
          </em>
        </span>
        <span className='item-stations'>
          <em>
            <i className='train-station train-start'>始</i>
            {dStation}
          </em>
          <br />
          <em>
            <i className='train-station train-end'>终</i>
            {aStation}
          </em>
        </span>
        <span className='item-train'>
          <em>{trainNumber}</em>
          <br />
          <em className='em-light'>{time}</em>
        </span>
        <span className='item-ticket'>
          <em>{priceMsg}</em>
          <br />
          <em className='em-light-orange'>可抢票</em>
        </span>
      </a>
    </li>
  );
};

const List = ({ list }) => (
  <ul className='list'>
    {list.map(item => (
      <ListItem {...item} key={item.trainNumber}></ListItem>
    ))}
  </ul>
);

List.propTypes = {
  list: PropTypes.array.isRequired
};

export default memo(List);
