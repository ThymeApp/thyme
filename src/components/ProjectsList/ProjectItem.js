// @flow

import React, { Component, Fragment } from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';

import { isDescendant } from '../../core/projects';

import { updateProject, removeProject } from '../../actions/projects';

import ProjectInput from '../ProjectInput';
import ProjectsList from './ProjectsList';
import remove from './remove.svg';

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
  level: number;
  onUpdateProject: (project: { id: string, name: string, parent: string | null }) => void,
  onRemoveProject: (id: string) => void,
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

    this.onRemoveEntry = () => {
      const { project, projects, onRemoveProject } = this.props;

      if (projects.find(item => item.parent === project.id)) {
        alert('This project has children, cannot remove.');
        return;
      }

      if (window.confirm('Are you sure you want to remove this project?')) {
        onRemoveProject(project.id);
      }
    };
  }

  onChangeName: (e: Event) => void;
  onChangeParent: (project: { value: string, label: string }) => void;
  onRemoveEntry: () => void;

  render(): Element<any> {
    const { project, projects, level } = this.props;

    return (
      <Fragment>
        <tr className="ProjectList__item">
          <td className={`ProjectList__level-${level}`}>
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
          <td>
            <button onClick={this.onRemoveEntry} className="ProjectList__button">
              <img className="ProjectList__button-image" src={remove} alt="Remove entry" />
            </button>
          </td>
        </tr>
        {ProjectsList({ projects, parent: project.id, level: level + 1 })}
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateProject(project: projectTreeType) {
      dispatch(updateProject(project));
    },

    onRemoveProject(id: string) {
      dispatch(removeProject(id));
    },
  };
}

export default connect(null, mapDispatchToProps)(ProjectItem);
