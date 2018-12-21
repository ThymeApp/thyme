// @flow

import React from 'react';

import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

type NotesInputType = {
  value: string;
  size: string;
  onChange: (e: Event) => void;
  onKeyPress: (e: KeyboardEvent) => void;
};

function NotesInput({
  value,
  size,
  onChange,
  onKeyPress,
}: NotesInputType) {
  return (
    <Input
      type="text"
      onChange={onChange}
      value={value}
      onKeyPress={onKeyPress}
      size={size || 'small'}
      style={{ width: '100%' }}
    />
  );
}

export default NotesInput;
