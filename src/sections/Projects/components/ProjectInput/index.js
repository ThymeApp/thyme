// @flow

import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

import { treeDisplayName } from 'core/projects';

import { sortedProjects } from 'sections/Projects/selectors';

type ProjectOption = {
  key: string;
  value: string;
  text: string;
  content: string;
}

type ProjectInputType = {
  placeholder?: string;
  value: string | null;
  size?: string;
  projects: ProjectOption[];
  handleChange: (value: string | null) => void;
  onAddItem?: (value: string) => void;
  disabled?: boolean;
};

function ProjectInput({
  placeholder,
  value,
  size,
  projects,
  handleChange,
  onAddItem,
  disabled,
}: ProjectInputType) {
  const onChange = useCallback((e: Event, project: { value: string | null }) => {
    // if the project is new, don't emit handleChange
    if (project.value !== null && !projects.some(p => p.value === project.value)) {
      return;
    }

    handleChange(project ? project.value : null);
  }, [projects, handleChange]);
  const onAddItemCallback = useCallback(
    (e: Event, project: { value: string }) => onAddItem && onAddItem(project.value),
    [onAddItem],
  );

  return (
    <Dropdown
      placeholder={placeholder || 'Select project...'}
      search
      selection
      deburr
      value={value}
      disabled={disabled}
      style={{
        fontSize: size === 'large' ? '1.14285714em' : '1em',
      }}
      onChange={onChange}
      allowAdditions={!!onAddItem}
      onAddItem={onAddItemCallback}
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
        text: treeDisplayName(project),
        content: treeDisplayName(project),
      })),
  };
}

export default connect(mapStateToProps)(ProjectInput);
