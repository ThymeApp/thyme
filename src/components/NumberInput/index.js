// @flow

import React from 'react';
import { Input } from 'semantic-ui-react';

type NumberInputType = {
  value: string,
  onChange: (e: Event) => void,
  onKeyPress: (e: KeyboardEvent) => void,
  title: string,
}

function NumberInput({
  value, onChange, onKeyPress, title,
}: NumberInputType) {
  return (
    <Input
      title={title}
      type="number"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      size="small"
    />
  );
}

export default NumberInput;
