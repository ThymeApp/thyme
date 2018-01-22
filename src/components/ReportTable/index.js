// @flow

import React from 'react';

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
          <th className="ReportTable__total-header">Total hours</th>
        </tr>
        {projects.map(project => (
          <tr key={project.id}>
            <td>{project.nameTree.join(' > ')}</td>
            <td>{project.time}</td>
          </tr>
        ))}
        <tr className="ReportTable__total">
          <td />
          <td>
            {projects.reduce((total, project) => total + project.time, 0)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ReportTable;
