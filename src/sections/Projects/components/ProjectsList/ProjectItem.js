// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import { isDescendant } from 'core/projects';
import { valueFromEventTarget } from 'core/dom';
import { render as renderComponent } from 'register/component';

import Responsive from 'components/Responsive';

import { alert } from 'actions/app';

import ProjectInput from 'sections/Projects/components/ProjectInput';

import { updateProject, removeProject } from '../../actions';

import ProjectsList from './ProjectsList';

export type ProjectItemProps = {
  projects: Array<ProjectTreeType>;
  project: ProjectTreeType;
  level: number;
  onUpdateProject: (project: ProjectProps) => void;
  onRemoveProject: (id: string) => void;
  showAlert: (message: string) => void;
};

type ProjectItemState = {
  confirmDelete: boolean,
};

class ProjectItem extends Component<ProjectItemProps, ProjectItemState> {
  state = { confirmDelete: false };

  onChangeName = (e: Event) => {
    const { project, onUpdateProject } = this.props;

    onUpdateProject({
      ...project,
      name: valueFromEventTarget(e.target),
    });
  };

  onChangeParent = (parent: string | null) => {
    const { project, projects, onUpdateProject } = this.props;

    // Can't move to this project because it's a descendant
    if (isDescendant(project.id, parent, projects)) {
      return;
    }

    onUpdateProject({
      ...project,
      parent,
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
              {renderComponent('projects.tablerow.name', { ...this.props, isMobile })}
              <Table.Cell className="field">
                {isMobile && (
                  <label>
                    Parent project
                  </label>
                )}
                <ProjectInput
                  handleChange={this.onChangeParent}
                  value={project.parent}
                  projects={projects}
                />
              </Table.Cell>
              {renderComponent('projects.tablerow.parent', { ...this.props, isMobile })}
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

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    onUpdateProject(project: ProjectProps) {
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
