import React from 'react';

function TimeInput({ value, onChange }) {
  return (
    <input type="time" value={value} onChange={onChange} />
  );
}

export default TimeInput;
