import React from 'react';

import './NotesInput.css';

function NotesInput({ value, onChange }) {
  return (
    <input className="NotesInput" type="text" onChange={onChange} value={value}/>
  );
}

export default NotesInput;
