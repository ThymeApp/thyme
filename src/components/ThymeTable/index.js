// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

import { updateTime, removeTime } from '../../actions/time';
import { addProject } from '../../actions/projects';

import NewTime from './New';
import Entry from './Entry';

type ThymeTableType = {
  entries: Array<timeType>,
  settings: Object,
  onEntryUpdate: (entry: timePropertyType) => void,
  onEntryRemove: (id: string) => void,
  onAddProject: (project: string) => string,
};

function ThymeTable({
  entries,
  settings,
  onEntryUpdate,
  onEntryRemove,
  onAddProject,
}: ThymeTableType) {
  return (
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Start</Table.HeaderCell>
          <Table.HeaderCell>End</Table.HeaderCell>
          <Table.HeaderCell>Duration</Table.HeaderCell>
          <Table.HeaderCell>Project</Table.HeaderCell>
          <Table.HeaderCell colSpan={2}>Notes</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {entries.map(entry => (
          <Entry
            key={entry.id}
            onRemove={onEntryRemove}
            onUpdate={onEntryUpdate}
            onAddNewProject={onAddProject}
            entry={entry}
            rounding={settings.rounding}
          />
        ))}
        <NewTime onAddNewProject={onAddProject} />
      </Table.Body>
    </Table>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onEntryUpdate(entry) {
      dispatch(updateTime(entry));
    },
    onEntryRemove(id) {
      dispatch(removeTime(id));
    },
    onAddProject(project) {
      const newProjectAction = addProject({ parent: null, name: project });

      dispatch(newProjectAction);

      return newProjectAction.id;
    },
  };
}

export default connect(null, mapDispatchToProps)(ThymeTable);
