// @flow

import React from 'react';

import './DateInput.css';

type DateInputType = {
  value: string,
  onChange: (e: Event) => void,
  onKeyPress: (e: KeyboardEvent) => void,
};

function DateInput({ value, onChange, onKeyPress }: DateInputType) {
  return (
    <input
      className="DateInput"
      type="date"
      onKeyPress={onKeyPress}
      onChange={onChange}
      value={value}
    />
  );
}

export default DateInput;
