// @flow

import React from 'react';

import DebouncedInput from 'components/DebouncedInput';

type TimeInputType = {
  value: string;
  size: string;
  onChange: (time: string) => void;
  onKeyPress: (e: KeyboardEvent) => void;
}

function TimeInput({
  value,
  size,
  onChange,
  onKeyPress,
}: TimeInputType) {
  return (
    <DebouncedInput
      type="time"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      size={size}
      required
    />
  );
}

export default TimeInput;
