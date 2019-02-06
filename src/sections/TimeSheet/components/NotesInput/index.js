// @flow

import React from 'react';

import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

type NotesInputType = {
  value: string;
  size: string;
  disabled?: boolean;
  onChange: (e: Event) => void;
  onKeyPress: (e: KeyboardEvent) => void;
};

function NotesInput({
  value,
  size,
  disabled,
  onChange,
  onKeyPress,
}: NotesInputType) {
  return (
    <Input
      type="text"
      onChange={onChange}
      value={value}
      disabled={disabled}
      onKeyPress={onKeyPress}
      size={size || 'small'}
      style={{ width: '100%' }}
    />
  );
}

export default NotesInput;
