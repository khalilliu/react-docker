import React, { memo } from 'react';
import './Ticket.css';

const Ticket = memo(props => {
  const { price, type } = props;

  return (
    <div className='ticket'>
      <p>
        <span className='ticket-type'>{type}</span>
        <span className='ticket-price'>{price}</span>
      </p>
      <div className='label'>坐席</div>
    </div>
  );
});

export default Ticket;
