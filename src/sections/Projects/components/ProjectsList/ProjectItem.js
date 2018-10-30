// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import { isDescendant } from 'core/projects';
import { valueFromEventTarget } from 'core/dom';
import { renderInjectable } from 'core/injectableComponent';

import Responsive from 'components/Responsive';

import { alert } from 'actions/app';

import ProjectInput from 'sections/Projects/components/ProjectInput';

import { updateProject, removeProject } from '../../actions';

import ProjectsList from './ProjectsList';

function projectValues(props): projectProps {
  return {
    id: props.project.id,
    name: props.project.name,
    parent: props.project.parent,
  };
}

type ProjectItemProps = {
  projects: Array<projectTreeType>;
  project: projectTreeType;
  level: number;
  onUpdateProject: (project: projectProps) => void;
  onRemoveProject: (id: string) => void;
  showAlert: (message: string) => void;
};

type ProjectItemState = {
  confirmDelete: boolean,
};

class ProjectItem extends Component<ProjectItemProps, ProjectItemState> {
  state = { confirmDelete: false };

  onChangeName = (e: Event) => {
    const { onUpdateProject } = this.props;

    onUpdateProject({
      ...projectValues(this.props),
      name: valueFromEventTarget(e.target),
    });
  };

  onChangeParent = (e: Event, parent: { value: string | null, label: string }) => {
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
    const {
      project,
      projects,
      level,
    } = this.props;
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
        <Responsive max="tablet">
          {isMobile => (
            <Table.Row className="ProjectList__item ui form">
              <Table.Cell className={`ProjectList__level-${level} field`}>
                {isMobile ? (
                  <Fragment>
                    <label>
                      Project name
                    </label>
                    {NameInput}
                  </Fragment>
                ) : (
                  <div className="ProjectList__item-container">
                    <div className="ProjectList__spacer" />
                    <Icon name="caret right" />
                    {NameInput}
                  </div>
                )}
              </Table.Cell>
              <Table.Cell className="field">
                {isMobile && (
                  <label>
                    Parent project
                  </label>
                )}
                <ProjectInput
                  handleChange={this.onChangeParent}
                  value={project.parent}
                  excludeValue
                />
              </Table.Cell>
              {renderInjectable('projects.tablerow.parent', { ...this.props, isMobile })}
              <Table.Cell>
                {isMobile ? (
                  <Button icon onClick={this.onRemoveEntry}>
                    <Icon name="remove" />
                    Remove project
                  </Button>
                ) : (
                  <Popup
                    inverted
                    trigger={(
                      <Button icon onClick={this.onRemoveEntry}>
                        <Icon name="remove" />
                      </Button>
                    )}
                    content="Remove project"
                  />
                )}
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
          )}
        </Responsive>
        {ProjectsList({
          projects,
          parent: project.id,
          level: level + 1,
        })}
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    onUpdateProject(project: projectProps) {
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
