import React from 'react';

import Entry from './Entry';

import './ThymeTable.css';

function ThymeTable() {
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
        <Entry />
      </tbody>
    </table>
  );
}

export default ThymeTable;
