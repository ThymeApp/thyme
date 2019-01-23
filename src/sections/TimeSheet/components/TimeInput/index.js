// @flow

import React from 'react';

import ChangeOnBlurInput from 'components/ChangeOnBlurInput';

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
    <ChangeOnBlurInput
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
