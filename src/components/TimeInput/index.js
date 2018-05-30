// @flow

import React from 'react';

import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

type TimeInputType = {
  value: string,
  onChange: (e: Event, data: any) => void,
  onKeyPress: (e: KeyboardEvent) => void,
  onBlur: (e: KeyboardEvent) => void,
}

function TimeInput({ value, onChange, onKeyPress, onBlur }: TimeInputType) {
  function handleOnChange(e, data) {
    console.log(e.target);
    console.log(data);
    e.target.value = data.value;
    onChange(e);
  }
  return (
    <Input
      type="time"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onBlur={onBlur}
      size="small"
    />
  );
}

export default TimeInput;
