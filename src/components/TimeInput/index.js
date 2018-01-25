// @flow

import React from 'react';
import { Input } from 'semantic-ui-react';

type TimeInputType = {
  value: string,
  onChange: (e: Event) => void,
  onKeyPress: (e: KeyboardEvent) => void,
}

function TimeInput({ value, onChange, onKeyPress }: TimeInputType) {
  return (
    <Input
      type="time"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      size="small"
    />
  );
}

export default TimeInput;
