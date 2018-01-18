// @flow

import React from 'react';

import './TimeInput.css';

type TimeInputType = {
  value: string,
  onChange: (e: Event) => void,
}

function TimeInput({ value, onChange }: TimeInputType) {
  return (
    <input className="TimeInput" type="time" value={value} onChange={onChange} />
  );
}

export default TimeInput;
