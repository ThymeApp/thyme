import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { sortedProjects } from '../../core/projects';

function ProjectInput({ value, projects, handleChange }) {
  return (
    <Select
      name="project"
      autosize
      value={value}
      onChange={handleChange}
      options={
        sortedProjects(projects)
          .map(project => ({
            value: project.id,
            label: project.name,
          }))
      }
    />
  );
}

function mapStateToProps(state) {
  const { allIds, byId } = state.projects;
  const projects = allIds.map(id => byId[id]);

  return { projects };
}

export default connect(mapStateToProps)(ProjectInput);
