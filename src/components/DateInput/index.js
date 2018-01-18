// @flow

import React from 'react';

import './DateInput.css';

type DateInputType = {
  value: string,
  setRef: (input: HTMLInputElement | null) => void,
  onChange: (e: Event) => void,
  onKeyPress: (e: KeyboardEvent) => void,
};

function DateInput({ value, setRef, onChange, onKeyPress }: DateInputType) {
  return (
    <input
      className="DateInput"
      type="date"
      ref={setRef}
      onKeyPress={onKeyPress}
      onChange={onChange}
      value={value}
    />
  );
}

export default DateInput;
