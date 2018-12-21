// @flow

import React from 'react';

import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

type TimeInputType = {
  value: string;
  size: string;
  onChange: (e: Event) => void;
  onKeyPress: (e: KeyboardEvent) => void;
}

function TimeInput({
  value,
  size,
  onChange,
  onKeyPress,
}: TimeInputType) {
  return (
    <Input
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
