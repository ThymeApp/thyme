// @flow

import React, { Component, Fragment } from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';

import { isDescendant } from '../../core/projects';

import { updateProject } from '../../actions/projects';

import ProjectInput from '../ProjectInput';
import ProjectsList from './ProjectsList';

function projectValues(props) {
  return {
    id: props.project.id,
    name: props.project.name,
    parent: props.project.parent,
  };
}

type ProjectItemType = {
  projects: Array<projectTreeType>,
  project: projectTreeType,
  onUpdateProject: (project: { id: string, name: string, parent: string | null }) => void,
};

class ProjectItem extends Component<ProjectItemType> {
  constructor(props) {
    super(props);

    this.onChangeName = (e) => {
      this.props.onUpdateProject({
        ...projectValues(this.props),
        name: e.target instanceof HTMLInputElement ? e.target.value : '',
      });
    };

    this.onChangeParent = (parent) => {
      const { project, projects, onUpdateProject } = this.props;

      const parentId = parent === null ? null : parent.value;

      // Can't move to this project because it's a descendant
      if (isDescendant(project.id, parentId, projects)) {
        return;
      }

      onUpdateProject({
        ...projectValues(this.props),
        parent: parentId,
      });
    };
  }

  onChangeName: (e: Event) => void;
  onChangeParent: (project: { value: string, label: string }) => void;

  render(): Element<any> {
    const { project, projects } = this.props;

    return (
      <Fragment>
        <tr className="ProjectList__item">
          <td>
            <input
              className="ProjectList__input"
              type="text"
              value={project.name}
              onChange={this.onChangeName}
            />
          </td>
          <td>
            <ProjectInput handleChange={this.onChangeParent} value={project.parent} excludeValue />
          </td>
        </tr>
        {ProjectsList({ projects, parent: project.id })}
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateProject(project) {
      dispatch(updateProject(project));
    },
  };
}

export default connect(null, mapDispatchToProps)(ProjectItem);
