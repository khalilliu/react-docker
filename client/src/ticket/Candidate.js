import React, { memo, useState, useCallback, useContext, useMemo } from 'react';
import URI from 'urijs';
import dayjs from 'dayjs';
import { TrainContext } from './context';

import './Candidate.css';

const Channel = memo(props => {
  const { name, desc, type } = props;

  const { trainNumber, departStation, arriveStation, departDate } = useContext(
    TrainContext
  );
  const src = useMemo(() => {
    return new URI('order.html')
      .search({
        trainNumber,
        dStation: departStation,
        aStation: arriveStation,
        type,
        date: dayjs(departDate).format('YYYY-MM-DD')
      })
      .toString();
  }, [type, trainNumber, departDate, departStation, arriveStation]);
  return (
    <div className='channel'>
      <div className='middle'>
        <div className='name'>{name}</div>
        <div className='desc'>{desc}</div>
      </div>
      <a href={src} className='buy-wrapper'>
        <div className='buy'>买票</div>
      </a>
    </div>
  );
});

const Seat = memo(props => {
  const {
    type,
    priceMsg,
    ticketsLeft,
    channels,
    expanded,
    onToggle,
    idx
  } = props;

  return (
    <li>
      <div className='bar' onClick={() => onToggle(idx)}>
        <span className='seat'>{type}</span>
        <span className='price'>
          <i>¥</i>
          {priceMsg}
        </span>
        <span className='btn'>{expanded ? '收起' : '预订'}</span>
        <span className='num'>{ticketsLeft}</span>
      </div>
      <div
        className='channels'
        style={{ height: expanded ? channels.length * 55 + 'px' : 0 }}
      >
        {channels.map(channel => (
          <Channel type={type} key={channel.name} {...channel}></Channel>
        ))}
      </div>
    </li>
  );
});

const Candidate = memo(props => {
  const { tickets } = props;

  const [expandedIndex, setExpandedIndex] = useState(-1);

  const onToggle = useCallback(
    idx => {
      setExpandedIndex(idx === expandedIndex ? -1 : idx);
    },
    [expandedIndex]
  );

  return (
    <div className='candidate'>
      <ul>
        {tickets.map((ticket, idx) => {
          return (
            <Seat
              idx={idx}
              onToggle={onToggle}
              expanded={expandedIndex === idx}
              {...ticket}
              key={ticket.type}
            ></Seat>
          );
        })}
      </ul>
    </div>
  );
});

export default Candidate;
