// @flow

import React from 'react';

import './NotesInput.css';

type NotesInputType = {
  value: string,
  onChange: (e: Event) => void,
};

function NotesInput({ value, onChange }: NotesInputType) {
  return (
    <input className="NotesInput" type="text" onChange={onChange} value={value} />
  );
}

export default NotesInput;
