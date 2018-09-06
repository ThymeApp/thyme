// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive/Responsive';

import { isDescendant } from '../../core/projects';

import { updateProject, removeProject } from '../../actions/projects';
import { alert } from '../../actions/app';

import ProjectInput from '../ProjectInput';
import ProjectsList from './ProjectsList'; // eslint-disable-line import/no-cycle

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
  showAlert: (message: string) => void,
};

type ProjectItemState = {
  confirmDelete: boolean,
};

class ProjectItem extends Component<ProjectItemType, ProjectItemState> {
  state = { confirmDelete: false };

  onChangeName = (e: Event) => {
    const { onUpdateProject } = this.props;

    onUpdateProject({
      ...projectValues(this.props),
      name: e.target instanceof HTMLInputElement ? e.target.value : '',
    });
  };

  onChangeParent = (e: Event, parent: { value: string, label: string }) => {
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

  onRemoveEntry = () => {
    const { project, projects, showAlert } = this.props;

    if (projects.find(item => item.parent === project.id)) {
      showAlert('This project has children, parent cannot be removed.');
      return;
    }

    this.setState({ confirmDelete: true });
  };

  onRemoveProject = () => {
    const { project, onRemoveProject } = this.props;

    this.onCancelConfirm();
    onRemoveProject(project.id);
  };

  onCancelConfirm = () => this.setState({ confirmDelete: false });

  render() {
    const { project, projects, level } = this.props;
    const { confirmDelete } = this.state;

    const NameInput = (
      <Input
        type="text"
        value={project.name}
        onChange={this.onChangeName}
      />
    );

    return (
      <Fragment>
        <Table.Row className="ProjectList__item ui form">
          <Table.Cell className={`ProjectList__level-${level} field`}>
            <Responsive as={Fragment} maxWidth={Responsive.onlyTablet.minWidth}>
              <label>
                Project name
              </label>
              {NameInput}
            </Responsive>
            <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
              <div className="ProjectList__item-container">
                <div className="ProjectList__spacer" />
                <Icon name="caret right" />
                {NameInput}
              </div>
            </Responsive>
          </Table.Cell>
          <Table.Cell className="field">
            <Responsive as={Fragment} maxWidth={Responsive.onlyTablet.minWidth}>
              <label>
                Parent project
              </label>
            </Responsive>
            <ProjectInput handleChange={this.onChangeParent} value={project.parent} excludeValue />
          </Table.Cell>
          <Table.Cell>
            <Responsive as={Fragment} maxWidth={Responsive.onlyTablet.minWidth}>
              <Button icon onClick={this.onRemoveEntry}>
                <Icon name="remove" />
                Remove project
              </Button>
            </Responsive>

            <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
              <Popup
                inverted
                trigger={(
                  <Button icon onClick={this.onRemoveEntry}>
                    <Icon name="remove" />
                  </Button>
                )}
                content="Remove project"
              />
            </Responsive>

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

    showAlert(message: string) {
      dispatch(alert(message));
    },
  };
}

export default connect(null, mapDispatchToProps)(ProjectItem);
