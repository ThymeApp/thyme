import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

function ProjectInput({ value, handleChange }) {
  return (
    <Select
      name="project"
      value={value}
      onChange={handleChange}
      options={[
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
      ]}
    />
  );
}

export default ProjectInput;
