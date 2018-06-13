// @flow

import React from 'react';
import { connect } from 'react-redux';

import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

import { sortedProjects } from '../../selectors/projects';

type ProjectInputType = {
  placeholder?: string,
  value: string,
  projects: Array<projectTreeType>,
  handleChange: ({ value: string, label: string }) => void,
  onAddItem?: (e: Event, project: { value: string }) => void,
};

function ProjectInput({
  placeholder,
  value,
  projects,
  handleChange,
  onAddItem,
}: ProjectInputType) {
  return (
    <Dropdown
      placeholder={placeholder || 'Select project...'}
      search
      selection
      value={value}
      onChange={handleChange}
      allowAdditions={!!onAddItem}
      onAddItem={onAddItem}
      options={[
        { key: null, value: null, text: 'No project' },
        ...projects
          .map(project => ({
            key: project.id,
            value: project.id,
            text: project.nameTree.join(' > '),
          })),
      ]}
    />
  );
}

function mapStateToProps(state) {
  return { projects: sortedProjects(state) };
}

export default connect(mapStateToProps)(ProjectInput);
