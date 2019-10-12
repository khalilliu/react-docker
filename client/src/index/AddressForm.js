import React from 'react';
import switchImg from './img/switch.svg';
import './AddressForm.css';

const AddressForm = props => {
  const { from, to, exchangeFromTo, showCitySelector } = props;

  return (
    <div className='address-form'>
      <div
        className='address-form__station'
        onClick={() => showCitySelector(true)}
      >
        <input
          type='text'
          readOnly
          name='from'
          value={from}
          className='address-form__input address-form__from'
        ></input>
      </div>
      <div className='address-form__switch' onClick={() => exchangeFromTo()}>
        <img src={switchImg} width='70' height='40' alt='switch'></img>
      </div>
      <div
        className='address-form__station'
        onClick={() => showCitySelector(false)}
      >
        <input
          type='text'
          readOnly
          name='to'
          value={to}
          className='address-form__input address-form__to'
        ></input>
      </div>
    </div>
  );
};

export default AddressForm;
