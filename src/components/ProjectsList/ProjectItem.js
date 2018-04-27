// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Input } from 'semantic-ui-react';

import { isDescendant } from '../../core/projects';

import { updateProject, removeProject } from '../../actions/projects';
import { alert } from '../../actions/app';

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
  alert: (message: string) => void,
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

    this.onChangeParent = (e, parent) => {
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
        props.alert('This project has children, parent cannot be removed.');
        return;
      }

      if (window.confirm('Are you sure you want to remove this project?')) {
        onRemoveProject(project.id);
      }
    };
  }

  onChangeName: (e: Event) => void;
  onChangeParent: (e: Event, project: { value: string, label: string }) => void;
  onRemoveEntry: () => void;

  render() {
    const { project, projects, level } = this.props;

    return (
      <Fragment>
        <Table.Row className="ProjectList__item">
          <Table.Cell className={`ProjectList__level-${level}`}>
            <Input
              type="text"
              value={project.name}
              onChange={this.onChangeName}
            />
          </Table.Cell>
          <Table.Cell width={6}>
            <ProjectInput handleChange={this.onChangeParent} value={project.parent} excludeValue />
          </Table.Cell>
          <Table.Cell width={1}>
            <button onClick={this.onRemoveEntry} className="ProjectList__button">
              <img className="ProjectList__button-image" src={remove} alt="Remove entry" />
            </button>
          </Table.Cell>
        </Table.Row>
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

    alert(message: string) {
      dispatch(alert(message));
    },
  };
}

export default connect(null, mapDispatchToProps)(ProjectItem);
