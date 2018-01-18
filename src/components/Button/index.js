// @flow

import React from 'react';

import './Button.css';

type ButtonType = {
  value: string,
  onClick: (e: Event) => void,
};

function Button({ value, onClick }: ButtonType) {
  return (
    <button className="Button" onClick={onClick}>
      {value}
    </button>
  );
}

export default Button;
