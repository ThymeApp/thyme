// @flow

import React from 'react';

import ChangeOnBlurInput from 'components/ChangeOnBlurInput';

type DateInputType = {
  value: string,
  size: string,
  disabled?: boolean;
  setRef?: any,
  onChange: (date: string) => void,
  onKeyPress: (e: KeyboardEvent) => void,
};

function DateInput({
  value,
  size,
  setRef,
  disabled,
  onChange,
  onKeyPress,
}: DateInputType) {
  return (
    <ChangeOnBlurInput
      type="date"
      disabled={disabled}
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
