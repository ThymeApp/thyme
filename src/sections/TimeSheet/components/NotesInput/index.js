// @flow

import React from 'react';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

type NotesInputType = {
  value: string,
  onChange: (e: Event) => void,
  onKeyPress: (e: KeyboardEvent) => void,
};

function NotesInput({ value, onChange, onKeyPress }: NotesInputType) {
  return (
    <Input
      type="text"
      onChange={onChange}
      value={value}
      onKeyPress={onKeyPress}
      size="small"
      style={{ width: '100%' }}
    />
  );
}

export default NotesInput;
