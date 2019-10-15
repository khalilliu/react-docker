import {
  ACTION_SET_TRAIN_NUMBER,
  ACTION_SET_DEPART_STATION,
  ACTION_SET_ARRIVE_STATION,
  ACTION_SET_SEAT_TYPE,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_ARRIVE_DATE,
  ACTION_SET_DEPART_TIME_STR,
  ACTION_SET_ARRIVE_TIME_STR,
  ACTION_SET_DURATION_STR,
  ACTION_SET_PRICE,
  ACTION_SET_PASSENGERS,
  ACTION_SET_MENU,
  ACTION_SET_IS_MENU_VISIBLE,
  ACTION_SET_SEARCH_PARSED
} from './constants';

export const setDepartStation = dStation => {
  return {
    type: ACTION_SET_DEPART_STATION,
    payload: dStation
  };
};

export const setArriveStation = aStation => {
  return {
    type: ACTION_SET_ARRIVE_STATION,
    payload: aStation
  };
};

export const setSeatType = type => {
  return {
    type: ACTION_SET_SEAT_TYPE,
    payload: type
  };
};

export const setDepartDate = departDate => {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate
  };
};

export const setSearchParsed = parsed => {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: parsed
  };
};

export const setTrainNumber = trainNumber => {
  return {
    type: ACTION_SET_TRAIN_NUMBER,
    payload: trainNumber
  };
};

export function setArriveDate(arriveDate) {
  return {
    type: ACTION_SET_ARRIVE_DATE,
    payload: arriveDate
  };
}
export function setDepartTimeStr(departTimeStr) {
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload: departTimeStr
  };
}
export function setArriveTimeStr(arriveTimeStr) {
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload: arriveTimeStr
  };
}
export function setDurationStr(durationStr) {
  return {
    type: ACTION_SET_DURATION_STR,
    payload: durationStr
  };
}

export function setPrice(price) {
  return {
    type: ACTION_SET_PRICE,
    payload: price
  };
}

export function setPassengers(passengers) {
  return {
    type: ACTION_SET_PASSENGERS,
    payload: passengers
  };
}

export function setMenu(menu) {
  return {
    type: ACTION_SET_MENU,
    payload: menu
  };
}

export function setIsMenuVisible(isMenuVisible) {
  return {
    type: ACTION_SET_IS_MENU_VISIBLE,
    payload: isMenuVisible
  };
}

export const fetchInitial = url => (dispatch, getState) => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const {
        departTimeStr,
        arriveTimeStr,
        arriveDate,
        durationStr,
        price
      } = data;

      dispatch(setDepartTimeStr(departTimeStr));
      dispatch(setArriveTimeStr(arriveTimeStr));
      dispatch(setArriveDate(arriveDate));
      dispatch(setDurationStr(durationStr));
      dispatch(setPrice(price));
    });
};

let passengerIdSeed = 0;

export const createAdult = () => (dispatch, getState) => {
  const { passengers } = getState();
  for (let passenger of passengers) {
    const keys = Object.keys(passenger);

    for (let key of keys) {
      if (!passenger[key]) {
        return;
      }
    }
  }

  dispatch(
    setPassengers([
      ...passengers,
      {
        id: ++passengerIdSeed,
        name: '',
        ticketType: 'adult',
        licenceNo: '',
        seat: 'Z'
      }
    ])
  );
};

export const createChild = () => (dispatch, getState) => {
  const { passengers } = getState();

  let adultFound = null;

  for (let passenger of passengers) {
    const keys = Object.keys(passenger);
    for (let key of keys) {
      if (!passenger[key]) {
        return;
      }
    }

    if (passenger.ticketType === 'adult') {
      adultFound = passenger.id;
    }
  }

  if (!adultFound) {
    alert('请至少正确添加一个同行成人');
    return;
  }

  dispatch(
    setPassengers([
      ...passengers,
      {
        id: ++passengerIdSeed,
        name: '',
        gender: 'female',
        birthday: '',
        followAdult: adultFound,
        ticketType: 'child',
        seat: 'Z'
      }
    ])
  );
};

export const removePassenger = id => (dispatch, getState) => {
  const { passengers } = getState();

  const newPassengers = passengers.filter(
    p => p.id !== id && p.followAdult !== id
  );
  dispatch(setPassengers(newPassengers));
};

export const updatePassenger = (id, data, keysToBeRemoved = []) => (
  dispatch,
  getState
) => {
  const { passengers } = getState();

  for (let i = 0; i < passengers.length; ++i) {
    if (passengers[i].id === id) {
      const newPassengers = [...passengers];
      newPassengers[i] = Object.assign({}, passengers[i], data);

      for (let key of keysToBeRemoved) {
        delete newPassengers[key];
      }

      dispatch(setPassengers(newPassengers));

      break;
    }
  }
};

export const showMenu = menu => dispatch => {
  // console.log(menu, 'from showMenu');
  dispatch(setMenu(menu));
  dispatch(setIsMenuVisible(true));
};

export const showGenderMenu = id => (dispatch, getState) => {
  const { passengers } = getState();

  const passenger = passengers.find(p => p.id === id);

  if (!passenger) {
    return;
  }

  dispatch(
    showMenu({
      onPress(gender) {
        dispatch(updatePassenger(id, { gender }));
        dispatch(hideMenu());
      },
      options: [
        {
          title: '男',
          value: 'male',
          active: 'male' === passenger.gender
        },
        {
          title: '女',
          value: 'female',
          active: 'female' === passenger.gender
        }
      ]
    })
  );
};

export const showTicketTypeMenu = id => (dispatch, getState) => {
  const { passengers } = getState();
  const passenger = passengers.find(passenger => passenger.id === id);

  if (!passenger) return;

  dispatch(
    showMenu({
      onPress(ticketType) {
        if ('adult' === ticketType) {
          dispatch(
            updatePassenger(
              id,
              {
                ticketType,
                licenceNo: ''
              },
              ['gender', 'followAdult', 'birthday']
            )
          );
        } else {
          const adult = passengers.find(
            passenger => passenger.id === id && passenger.ticketType === 'adult'
          );
          if (adult) {
            dispatch(
              updatePassenger(
                id,
                {
                  ticketType,
                  gender: '',
                  followAdult: adult.id,
                  birthday: ''
                },
                ['licenceNo']
              )
            );
          } else {
            alert('没有其他成人乘客');
          }
        }
        dispatch(hideMenu());
      },
      options: [
        {
          title: '成人票',
          value: 'adult',
          active: 'adult' === passenger.ticketType
        },
        {
          title: '儿童票',
          value: 'child',
          active: 'child' === passenger.ticketType
        }
      ]
    })
  );
};

export function showFollowAdultMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState();

    const passenger = passengers.find(passenger => passenger.id === id);

    if (!passenger) {
      return;
    }

    dispatch(
      showMenu({
        onPress(followAdult) {
          dispatch(updatePassenger(id, { followAdult }));
          dispatch(hideMenu());
        },
        options: passengers
          .filter(passenger => passenger.ticketType === 'adult')
          .map(adult => {
            return {
              title: adult.name,
              value: adult.id,
              active: adult.id === passenger.followAdult
            };
          })
      })
    );
  };
}

export function hideMenu() {
  return setIsMenuVisible(false);
}
