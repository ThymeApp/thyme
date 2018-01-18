// @flow

import React from 'react';
import classnames from 'classnames';

import './Button.css';

type ButtonType = {
  red?: boolean,
  value: string,
  onClick: (e: Event) => void,
};

function Button({ red = false, value, onClick }: ButtonType) {
  return (
    <button
      className={classnames('Button', { 'Button--red': red })}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Button;
