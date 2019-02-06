// @flow

import React from 'react';

import ChangeOnBlurInput from 'components/ChangeOnBlurInput';

type TimeInputType = {
  value: string;
  size: string;
  disabled?: boolean;
  onChange: (time: string) => void;
  onKeyPress: (e: KeyboardEvent) => void;
}

function TimeInput({
  value,
  size,
  disabled,
  onChange,
  onKeyPress,
}: TimeInputType) {
  return (
    <ChangeOnBlurInput
      type="time"
      value={value}
      disabled={disabled}
      onChange={onChange}
      onKeyPress={onKeyPress}
      size={size}
      required
    />
  );
}

export default TimeInput;
