// @flow

import React from 'react';

import { formatDuration } from '../../core/thyme';

import './ReportTable.css';

type ReportTableType = {
  projects: Array<projectTreeType & { time: number }>,
};

function ReportTable({ projects }: ReportTableType) {
  return (
    <table className="ReportTable">
      <tbody>
        <tr className="ReportTable__header">
          <th>Project</th>
          <th className="ReportTable__total-header">Total spent</th>
        </tr>
        {projects.map(project => (
          <tr key={project.id}>
            <td>{project.nameTree.join(' > ')}</td>
            <td className="ReportTable__duration">{formatDuration(project.time * 60)}</td>
          </tr>
        ))}
        <tr className="ReportTable__total">
          <td />
          <td className="ReportTable__duration">
            {formatDuration(projects.reduce((total, project) => total + (project.time * 60), 0))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ReportTable;
