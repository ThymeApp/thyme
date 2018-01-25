// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

import { updateTime, removeTime } from '../../actions/time';

import NewTime from './New';
import Entry from './Entry';

import './ThymeTable.css';

type ThymeTableType = {
  entries: Array<timeType>,
  onEntryUpdate: (entry: timePropertyType) => void,
  onEntryRemove: (id: string) => void,
};

function ThymeTable({
  entries,
  onEntryUpdate,
  onEntryRemove,
}: ThymeTableType) {
  return (
    <Table className="ThymeTable">
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
            entry={entry}
          />
        ))}
        <NewTime />
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
  };
}

export default connect(null, mapDispatchToProps)(ThymeTable);
