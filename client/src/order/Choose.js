import React, { memo } from 'react';

import classnames from 'classnames';
import './Choose.css';

const Choose = memo(props => {
  const { passengers, updatePassenger } = props;

  const createSeat = seatType => {
    return (
      <div>
        {passengers.map(p => (
          <p
            key={p.id}
            className={classnames('seat', { active: p.seat === seatType })}
            data-text={seatType}
            onClick={() => updatePassenger(p.id, { seat: seatType })}
          >
            {' '}
            &#xe02d;
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className='choose'>
      <p className='tip'>在线选座</p>
      <div className='container'>
        <div className='seats'>
          <div>窗</div>
          {createSeat('A')}
          {createSeat('B')}
          {createSeat('C')}
          <div>过道</div>
          {createSeat('D')}
          {createSeat('F')}
          <div>窗</div>
        </div>
      </div>
    </div>
  );
});

export default Choose;
