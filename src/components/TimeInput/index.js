import React from 'react';

import './TimeInput.css';

function TimeInput({ value, onChange }) {
  return (
    <input className="TimeInput" type="time" value={value} onChange={onChange} />
  );
}

export default TimeInput;
