import React, { memo, useMemo } from 'react';

import './Passengers.css';

const Passenger = memo(props => {
  const {
    id,
    name,
    gender,
    birthday,
    licenceNo,
    ticketType,
    followAdultName,
    onRemove,
    onUpdate,
    showFollowAdultMenu,
    showTicketTypeMenu,
    showGenderMenu
  } = props;
  const isAdult = ticketType === 'adult';
  return (
    <li className='passenger'>
      <i className='delete' onClick={() => onRemove(id)}>
        -
      </i>
      <ol className='items'>
        {/* 姓名 */}
        <li className='item'>
          <label className='label name'>姓名:</label>
          <input
            type='text'
            className='input name'
            placeholder='乘客姓名'
            value={name}
            onChange={e => onUpdate(id, { name: e.target.value })}
          />
          <label className='ticket-type' onClick={() => showTicketTypeMenu(id)}>
            {isAdult ? '成人票' : '儿童票'}
          </label>
        </li>
        {/* 身份证 - 成人 */}
        {isAdult && (
          <li className='item'>
            <label className='label licenceNo'>身份证</label>
            <input
              type='text'
              className='input licenceNo'
              placeholder='证件号码'
              value={licenceNo}
              onChange={e => onUpdate(id, { licenceNo: e.target.value })}
            ></input>
          </li>
        )}
        {/* 性别 - 儿童 */}
        {!isAdult && (
          <li className='item arrow'>
            <label className='label gender'>性别</label>
            <input
              type='text'
              className='input gender'
              placeholder='请选择'
              value={gender === 'male' ? '男' : gender === 'female' ? '女' : ''}
              onClick={e => showGenderMenu(id)}
              readOnly
            ></input>
          </li>
        )}
        {/* 出生日期 - 儿童 */}
        {!isAdult && (
          <li className='item'>
            <label className='label birthday'>出生日期</label>
            <input
              type='text'
              className='input birthday'
              placeholder='如 19951015'
              value={birthday}
              onChange={e => onUpdate(id, { birthday: e.target.value })}
            ></input>
          </li>
        )}
        {/* 同行 */}
        {!isAdult && (
          <li className='item arrow'>
            <label className='label followAdult'>同行成人</label>
            <input
              type='text'
              className='input followAdult'
              placeholder='请选择'
              value={followAdultName}
              onClick={() => showFollowAdultMenu(id)}
              readOnly
            />
          </li>
        )}
      </ol>
    </li>
  );
});

const Passengers = memo(props => {
  const {
    passengers,
    createAdult,
    createChild,
    removePassenger,
    updatePassenger,
    showGenderMenu,
    showFollowAdultMenu,
    showTicketTypeMenu
  } = props;

  const nameMap = useMemo(() => {
    const ret = passengers.reduce((cur, prev) => {
      cur[prev.id] = prev.name;
      return cur;
    }, {});

    return ret;
  }, [passengers]);

  return (
    <div className='passengers'>
      <ul>
        {passengers.map(passenger => (
          <Passenger
            {...passenger}
            followAdultName={
              (passenger.followAdult && nameMap[passenger.followAdult]) || ''
            }
            showTicketTypeMenu={showTicketTypeMenu}
            showGenderMenu={showGenderMenu}
            showFollowAdultMenu={showFollowAdultMenu}
            onRemove={removePassenger}
            onUpdate={updatePassenger}
            key={passenger.id}
          ></Passenger>
        ))}
      </ul>
      <section className='add'>
        <div className='adult' onClick={() => createAdult()}>
          添加成人
        </div>
        <div className='child' onClick={() => createChild()}>
          添加儿童
        </div>
      </section>
    </div>
  );
});

export default Passengers;
