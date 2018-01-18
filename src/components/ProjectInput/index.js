// @flow

import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { sortedProjects } from '../../core/projects';

type ProjectInputType = {
  placeholder?: string,
  value: string,
  projects: Array<projectType>,
  handleChange: ({ value: string, label: string }) => void,
};

function ProjectInput({ placeholder, value, projects, handleChange }: ProjectInputType) {
  return (
    <Select
      name="project"
      autosize
      value={value}
      placeholder={placeholder || 'Select project...'}
      onChange={handleChange}
      options={
        sortedProjects(projects)
          .map(project => ({
            value: project.id,
            label: project.nameTree.join(' > '),
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
