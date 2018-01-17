import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { addTime, updateTime } from '../../actions/time';

import Entry from './Entry';

import './ThymeTable.css';

function ThymeTable({ onEntryUpdate }) {
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
        </tr>
        <Entry onUpdate={onEntryUpdate} />
      </tbody>
    </table>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onEntryUpdate(entry) {
      if (!entry.id) {
        dispatch(addTime({
          ...entry,
          id: shortid.generate(),
        }));
        return;
      }

      dispatch(updateTime(entry));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThymeTable);
