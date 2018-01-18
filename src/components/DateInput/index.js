// @flow

import React from 'react';

import './DateInput.css';

type DateInputType = {
  value: string,
  onChange: (e: Event) => void,
};

function DateInput({ value, onChange }: DateInputType) {
  return (
    <input className="DateInput" type="date" onChange={onChange} value={value} />
  );
}

export default DateInput;
