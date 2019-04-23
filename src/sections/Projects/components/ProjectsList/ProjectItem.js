// @flow

import React, { useState, useCallback } from 'react';
import classnames from 'classnames';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import { render as renderComponent } from 'register/component';

import { useResponsive } from 'components/Responsive';
import ChangeOnBlurInput from 'components/ChangeOnBlurInput';

import ProjectColourPicker from '../ProjectColourPicker';
import ProjectInput from '../ProjectInput';

import ProjectsList from './ProjectsList'; // eslint-disable-line import/no-cycle

import { defaultColour } from '../../colours';

export type ProjectItemProps = {
  project: ProjectTreeType;
  level: number;
  onUpdateProject: (project: ProjectProps) => void;
  onRemoveProject: (id: string) => void;
  onArchiveProject: (id: string) => void;
  onChangeParent: (project: ProjectTreeType, parent: string | null) => void;
};

type confirmNames = '' | 'remove' | 'archive';

function useConfirmDelete(
  project: ProjectTreeType,
  onRemoveProject: (id: string) => void,
  onArchiveProject: (id: string) => void,
) {
  const [confirmDelete, setConfirmDelete] = useState<confirmNames>('');

  const onArchive = useCallback(() => setConfirmDelete('archive'), [setConfirmDelete]);
  const onRemove = useCallback(() => setConfirmDelete('remove'), [setConfirmDelete]);
  const onCancel = useCallback(() => setConfirmDelete(''), [setConfirmDelete]);

  const confirms = {
    '': {
      text: '',
      buttonText: '',
      onConfirm: () => {},
    },
    remove: {
      text: 'Are you sure you want to remove this project?',
      buttonText: 'Remove project',
      onConfirm: () => {
        onCancel();
        onRemoveProject(project.id);
      },
    },
    archive: {
      text: `Do you want to ${project.archived ? 'unarchive' : 'archive'} this project?`,
      buttonText: project.archived ? 'Unarchive project' : 'Archive project',
      onConfirm: () => {
        onCancel();
        onArchiveProject(project.id);
      },
    },
  };

  return [confirmDelete, onArchive, onRemove, onCancel, confirms[confirmDelete]];
}

function ProjectItem(props: ProjectItemProps) {
  const {
    project,
    level,
    onUpdateProject,
    onRemoveProject,
    onArchiveProject,
    onChangeParent,
  } = props;
  const [confirmDelete, onArchive, onRemove, onCancel, confirmOptions] = useConfirmDelete(
    project,
    onRemoveProject,
    onArchiveProject,
  );
  const [isMobile] = useResponsive({ max: 'tablet' });

  const onChangeColour = useCallback((colour: ProjectColour) => {
    onUpdateProject({
      ...project,
      colour,
    });
  }, [project, onUpdateProject]);

  const onChangeName = useCallback((name: string) => {
    onUpdateProject({
      ...project,
      name,
    });
  }, [project, onUpdateProject]);

  const onChangeParentProject = useCallback((parent: string | null) => {
    onChangeParent(project, parent);
  }, [project, onChangeParent]);

  const NameInput = (
    <ChangeOnBlurInput
      type="text"
      value={project.name}
      onChange={onChangeName}
    />
  );

  const ColourInput = (
    <ProjectColourPicker
      colour={project.colour || defaultColour}
      onChange={onChangeColour}
    />
  );

  const archiveText = project.archived ? 'Unarchive project' : 'Archive project';

  const ArchiveButton = (
    <Button
      onClick={onArchive}
      icon="archive"
      content={isMobile ? archiveText : null}
    />
  );

  const RemoveButton = (
    <Button
      icon="remove"
      onClick={onRemove}
      content={isMobile ? 'Remove project' : null}
    />
  );

  return (
    <>
      <Table.Row className={classnames('ProjectList__item ui form', { 'ProjectList__item--archived': !!project.archived })}>
        <Table.Cell className={`ProjectList__level-${level} field`}>
          {isMobile ? (
            <>
              <label>
                Project name
              </label>
              {ColourInput}
              {NameInput}
            </>
          ) : (
            <div className="ProjectList__item-container">
              <div className="ProjectList__spacer" />
              <Icon name="caret right" />
              {ColourInput}
              {NameInput}
            </div>
          )}
        </Table.Cell>
        {renderComponent('projects.tablerow.name', { ...props, isMobile })}
        <Table.Cell className="field">
          {isMobile && (
            <label>
              Parent project
            </label>
          )}
          <ProjectInput
            handleChange={onChangeParentProject}
            value={project.parent}
          />
        </Table.Cell>
        {renderComponent('projects.tablerow.parent', { ...props, isMobile })}
        <Table.Cell textAlign="right" style={{ whiteSpace: isMobile ? 'normal' : 'nowrap' }}>
          {isMobile ? (
            ArchiveButton
          ) : (
            <Popup
              inverted
              trigger={ArchiveButton}
              content={archiveText}
            />
          )}
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
            onCancel={onCancel}
            onConfirm={confirmOptions.onConfirm}
          />
        </Table.Cell>
      </Table.Row>
      <ProjectsList
        parent={project.id}
        level={level + 1}
        onUpdateProject={onUpdateProject}
        onRemoveProject={onRemoveProject}
        onArchiveProject={onArchiveProject}
        onChangeParent={onChangeParent}
      />
    </>
  );
}

export default ProjectItem;
