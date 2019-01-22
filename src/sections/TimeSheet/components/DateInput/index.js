// @flow

import React from 'react';

import DebouncedInput from 'components/DebouncedInput';

type DateInputType = {
  value: string,
  size: string,
  setRef: (input: HTMLInputElement | null) => void,
  onChange: (date: string) => void,
  onKeyPress: (e: KeyboardEvent) => void,
};

function DateInput({
  value,
  size,
  setRef,
  onChange,
  onKeyPress,
}: DateInputType) {
  return (
    <DebouncedInput
      type="date"
      setRef={setRef}
      onKeyPress={onKeyPress}
      onChange={onChange}
      value={value}
      size={size}
      required
    />
  );
}

export default DateInput;
