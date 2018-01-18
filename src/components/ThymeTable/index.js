// @flow

import React from 'react';
import { connect } from 'react-redux';

import { updateTime, removeTime } from '../../actions/time';

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
    <table className="ThymeTable">
      <tbody>
        <tr className="ThymeTable__header">
          <th>Date</th>
          <th>Start</th>
          <th>End</th>
          <th>Duration</th>
          <th>Project</th>
          <th>Notes</th>
          <th />
        </tr>
        {entries.map(entry => (
          <Entry
            key={entry.id}
            onRemove={onEntryRemove}
            onUpdate={onEntryUpdate}
            entry={entry}
          />
        ))}
      </tbody>
    </table>
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
