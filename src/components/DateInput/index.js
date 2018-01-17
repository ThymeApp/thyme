import React from 'react';

import './DateInput.css';

function DateInput({ value, onChange }) {
  return (
    <input className="DateInput" type="date" onChange={onChange} value={value} />
  );
}

export default DateInput;
