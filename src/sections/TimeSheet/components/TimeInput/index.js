// @flow

import React, { useCallback } from 'react';

import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

import { valueFromEventTarget } from 'core/dom';

type TimeInputType = {
  value: string;
  size: string;
  disabled?: boolean;
  onChange: (time: string) => void;
  onKeyPress?: (e: KeyboardEvent) => void;
}

function TimeInput({
  value,
  size,
  disabled,
  onChange,
  onKeyPress,
}: TimeInputType) {
  const onChangeHandler = useCallback((e) => onChange(valueFromEventTarget(e.target)), [onChange]);

  return (
    <Input
      type="time"
      value={value}
      disabled={disabled}
      onChange={onChangeHandler}
      onKeyPress={onKeyPress}
      size={size}
      required
    />
  );
}

export default TimeInput;
