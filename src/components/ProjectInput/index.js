// @flow

import React from 'react';
import { connect } from 'react-redux';

import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

import { sortedProjects } from '../../selectors/projects';

type ProjectInputType = {
  placeholder?: string,
  value: string | null,
  projects: Array<projectTreeType>,
  handleChange: (e: Event, { value: string | null, label: string }) => void,
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
        ...projects,
      ]}
    />
  );
}

function mapStateToProps(state) {
  return {
    projects: sortedProjects(state)
      .map(project => ({
        key: project.id,
        value: project.id,
        text: project.nameTree.join(' > '),
      })),
  };
}

export default connect(mapStateToProps)(ProjectInput);
