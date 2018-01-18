// @flow

import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { addTime, updateTime, removeTime } from '../../actions/time';

import Entry from './Entry';

import './ThymeTable.css';

type ThymeTableType = {
  entries: Array<timeType>,
  onEntryCreate: (entry: timePropertyType) => void,
  onEntryUpdate: (entry: timePropertyType) => void,
  onEntryRemove: (id: string) => void,
};

function ThymeTable({
  entries,
  onEntryCreate,
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
        <Entry onAdd={onEntryCreate} />
      </tbody>
    </table>
  );
}

function mapStateToProps(state) {
  const { allIds, byId } = state.time;
  const entries = allIds.map(id => byId[id]);

  return { entries };
}

function mapDispatchToProps(dispatch) {
  return {
    onEntryUpdate(entry) {
      dispatch(updateTime(entry));
    },
    onEntryCreate(entry: timePropertyType) {
      dispatch(addTime({
        ...entry,
        id: shortid.generate(),
      }));
    },
    onEntryRemove(id) {
      dispatch(removeTime(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThymeTable);
