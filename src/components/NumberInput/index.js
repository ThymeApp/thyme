// @flow

import React from 'react';
import { Input } from 'semantic-ui-react';

type NumberInputType = {
  value: string,
  onChange: (e: Event) => void,
  title: string,
}

function NumberInput({
  value, onChange, title,
}: NumberInputType) {
  return (
    <Input
      title={title}
      type="number"
      value={value}
      onChange={onChange}
      size="small"
    />
  );
}

export default NumberInput;
