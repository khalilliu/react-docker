import React, { memo } from 'react';
import './Submit.css';

const Submit = memo(() => {
  return (
    <div className='submit'>
      <button className='submit-button' type='submit'>
        搜索
      </button>
    </div>
  );
});

export default Submit;
