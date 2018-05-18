// @flow

import React from 'react';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

type DateInputType = {
  value: string,
  setRef: (input: HTMLInputElement | null) => void,
  onChange: (e: Event) => void,
  onKeyPress: (e: KeyboardEvent) => void,
};

function DateInput({
  value,
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
      size="small"
    />
  );
}

export default DateInput;
