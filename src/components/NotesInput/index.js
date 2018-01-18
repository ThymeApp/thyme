// @flow

import React from 'react';

import './NotesInput.css';

type NotesInputType = {
  value: string,
  onChange: (e: Event) => void,
  onKeyPress: (e: KeyboardEvent) => void,
};

function NotesInput({ value, onChange, onKeyPress }: NotesInputType) {
  return (
    <input
      className="NotesInput"
      type="text"
      onChange={onChange}
      value={value}
      onKeyPress={onKeyPress}
    />
  );
}

export default NotesInput;
