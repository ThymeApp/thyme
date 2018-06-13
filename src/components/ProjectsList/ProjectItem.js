// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import { isDescendant } from '../../core/projects';

import { updateProject, removeProject } from '../../actions/projects';
import { alert } from '../../actions/app';

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
  level: number;
  onUpdateProject: (project: { id: string, name: string, parent: string | null }) => void,
  onRemoveProject: (id: string) => void,
  alert: (message: string) => void,
};

type ProjectItemState = {
  confirmDelete: boolean,
};

class ProjectItem extends Component<ProjectItemType, ProjectItemState> {
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
      const { project, projects } = this.props;

      if (projects.find(item => item.parent === project.id)) {
        props.alert('This project has children, parent cannot be removed.');
        return;
      }

      this.setState({ confirmDelete: true });
    };

    this.onRemoveProject = () => {
      const { project, onRemoveProject } = this.props;

      this.onCancelConfirm();
      onRemoveProject(project.id);
    };

    this.onCancelConfirm = () => this.setState({ confirmDelete: false });

    this.state = { confirmDelete: false };
  }

  onChangeName: (e: Event) => void;
  onChangeParent: (e: Event, project: { value: string, label: string }) => void;
  onRemoveEntry: () => void;
  onRemoveProject: () => void;
  onCancelConfirm: () => void;

  render() {
    const { project, projects, level } = this.props;
    const { confirmDelete } = this.state;

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
            <Popup
              inverted
              trigger={(
                <Button icon onClick={this.onRemoveEntry}>
                  <Icon name="remove" />
                </Button>
              )}
              content="Remove project"
            />

            <Confirm
              open={confirmDelete}
              content="Are you sure you want to remove this project?"
              confirmButton="Remove project"
              size="mini"
              onCancel={this.onCancelConfirm}
              onConfirm={this.onRemoveProject}
            />
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
