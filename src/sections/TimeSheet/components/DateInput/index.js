// @flow

import React from 'react';

import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

type DateInputType = {
  value: string,
  size: string,
  setRef: (input: HTMLInputElement | null) => void,
  onChange: (e: Event) => void,
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
    <Input
      type="date"
      ref={setRef}
      onKeyPress={onKeyPress}
      onChange={onChange}
      value={value}
      size={size}
      required
    />
  );
}

export default DateInput;
