import React, { memo } from 'react';
import classnames from 'classnames';
import './Menu.css';

const MenuItem = memo(props => {
  const { onPress, title, value, active } = props;
  return (
    <li
      className={classnames({ active })}
      onClick={() => {
        console.error(value);
        onPress(value);
      }}
    >
      {title}
    </li>
  );
});

const Menu = memo(props => {
  const { show, options, onPress, hideMenu } = props;
  return (
    <div>
      {show && <div className='menu-mask' onClick={hideMenu}></div>}
      <div className={classnames('menu', { show: show })}>
        <div className='menu-title'></div>
        <ul>
          {options &&
            options.map(option => (
              <MenuItem
                key={option.value}
                {...option}
                onPress={onPress}
              ></MenuItem>
            ))}
        </ul>
      </div>
    </div>
  );
});

export default Menu;
