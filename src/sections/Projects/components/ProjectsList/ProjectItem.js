// @flow

import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

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

import ProjectInput from 'sections/Projects/components/ProjectInput';

import ProjectsList from './ProjectsList';

export type ProjectItemProps = {
  projects: Array<ProjectTreeType>;
  project: ProjectTreeType;
  level: number;
  onUpdateProject: (project: ProjectProps) => void;
  onRemoveProject: (id: string) => void;
  onArchiveProject: (id: string) => void;
};

type confirmNames = '' | 'remove' | 'archive';

type ProjectItemState = {
  confirmDelete: confirmNames,
};

class ProjectItem extends Component<ProjectItemProps, ProjectItemState> {
  state = { confirmDelete: '' };

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
    this.setState({ confirmDelete: 'remove' });
  };

  onRemoveProject = () => {
    const { project, onRemoveProject } = this.props;

    this.onCancelConfirm();
    onRemoveProject(project.id);
  };

  onArchiveEntry = () => {
    this.setState({ confirmDelete: 'archive' });
  };

  onArchiveProject = () => {
    const { project, onArchiveProject } = this.props;

    this.onCancelConfirm();
    onArchiveProject(project.id);
  };

  onCancelConfirm = () => this.setState({ confirmDelete: '' });

  confirmOptions(name: confirmNames) {
    const { project } = this.props;

    if (name === '') {
      return {
        text: '',
        buttonText: '',
        onConfirm: () => {},
      };
    }

    const confirms = {
      remove: {
        text: 'Are you sure you want to remove this project?',
        buttonText: 'Remove project',
        onConfirm: () => this.onRemoveProject(),
      },
      archive: {
        text: `Do you want to ${project.archived ? 'unarchive' : 'archive'} this project?`,
        buttonText: project.archived ? 'Unarchive project' : 'Archive project',
        onConfirm: () => this.onArchiveProject(),
      },
    };

    return confirms[name];
  }

  render() {
    const {
      project,
      level,
      onUpdateProject,
      onRemoveProject,
      onArchiveProject,
    } = this.props;
    const { confirmDelete } = this.state;

    const NameInput = (
      <Input
        type="text"
        value={project.name}
        onChange={this.onChangeName}
      />
    );

    const archiveText = project.archived ? 'Unarchive project' : 'Archive project';

    const ArchiveButton = (
      <Button icon onClick={this.onArchiveEntry}>
        <Icon name="archive" />
        <Responsive max="tablet">
          {isMobile => (isMobile ? archiveText : '')}
        </Responsive>
      </Button>
    );

    const RemoveButton = (
      <Button icon onClick={this.onRemoveEntry}>
        <Icon name="remove" />
        <Responsive max="tablet">
          {isMobile => (isMobile ? 'Remove project' : '')}
        </Responsive>
      </Button>
    );

    const confirmOptions = this.confirmOptions(confirmDelete);

    return (
      <Fragment>
        <Responsive max="tablet">
          {isMobile => (
            <Table.Row className={classnames('ProjectList__item ui form', { 'ProjectList__item--archived': !!project.archived })}>
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
                />
              </Table.Cell>
              {renderComponent('projects.tablerow.parent', { ...this.props, isMobile })}
              <Table.Cell>
                {isMobile ? (
                  ArchiveButton
                ) : (
                  <Popup
                    inverted
                    trigger={ArchiveButton}
                    content={archiveText}
                  />
                )}
              </Table.Cell>
              <Table.Cell>
                {isMobile ? (
                  RemoveButton
                ) : (
                  <Popup
                    inverted
                    trigger={RemoveButton}
                    content="Remove project"
                  />
                )}
                <Confirm
                  open={confirmDelete !== ''}
                  content={confirmOptions.text}
                  confirmButton={confirmOptions.buttonText}
                  size="mini"
                  onCancel={this.onCancelConfirm}
                  onConfirm={confirmOptions.onConfirm}
                />
              </Table.Cell>
            </Table.Row>
          )}
        </Responsive>
        <ProjectsList
          parent={project.id}
          level={level + 1}
          onUpdateProject={onUpdateProject}
          onRemoveProject={onRemoveProject}
          onArchiveProject={onArchiveProject}
        />
      </Fragment>
    );
  }
}

export default ProjectItem;
