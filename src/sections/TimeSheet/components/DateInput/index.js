// @flow

import React, { useCallback } from 'react';

import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

import { valueFromEventTarget } from 'core/dom';

type DateInputType = {
  value: string,
  size: string,
  onChange: (date: string) => void,
  disabled?: boolean;
  setRef?: any,
  onKeyPress?: (e: KeyboardEvent) => void,
};

function DateInput({
  value,
  size,
  setRef,
  disabled,
  onChange,
  onKeyPress,
}: DateInputType) {
  const onChangeHandler = useCallback((e) => onChange(valueFromEventTarget(e.target)), [onChange]);

  return (
    <Input
      type="date"
      disabled={disabled}
      ref={setRef}
      onKeyPress={onKeyPress}
      onChange={onChangeHandler}
      value={value}
      size={size}
      required
    />
  );
}

export default DateInput;
