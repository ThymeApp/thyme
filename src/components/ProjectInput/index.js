// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

import { sortedProjects } from '../../core/projects';

type ProjectInputType = {
  placeholder?: string,
  value: string,
  projects: Array<projectTreeType>,
  handleChange: ({ value: string, label: string }) => void,
};

function ProjectInput({
  placeholder,
  value,
  projects,
  handleChange,
}: ProjectInputType) {
  return (
    <Dropdown
      placeholder={placeholder || 'Select project...'}
      search
      selection
      value={value}
      onChange={handleChange}
      options={
        [
          { key: null, value: null, text: 'No project' },
          ...projects
            .map(project => ({
              key: project.id,
              value: project.id,
              text: project.nameTree.join(' > '),
            })),
        ]
      }
    />
  );
}

function mapStateToProps(state) {
  const { allIds, byId } = state.projects;
  const projects = allIds.map(id => byId[id]);

  return { projects: sortedProjects(projects) };
}

export default connect(mapStateToProps)(ProjectInput);
