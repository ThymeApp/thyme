// @flow

import React from 'react';

import './TimeInput.css';

type TimeInputType = {
  value: string,
  onChange: (e: Event) => void,
  onKeyPress: (e: KeyboardEvent) => void,
}

function TimeInput({ value, onChange, onKeyPress }: TimeInputType) {
  return (
    <input
      className="TimeInput"
      type="time"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
}

export default TimeInput;
