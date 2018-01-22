// @flow

import React from 'react';

import './ReportFilters.css';

type ReportFiltersType = {
  projects: Array<projectTreeType & { time: number }>,
};

function ReportFilters({ projects }: ReportFiltersType) {
  return (
    <div className="Report__filters">
      <span className="Report__filters-label">Show:</span>
      {projects.map(project => (
        <label className="Report__filter" key={project.id} htmlFor={project.id}>
          <span className="Report__filter-name">{project.name}</span>
          <input defaultChecked type="checkbox" name={project.id} id={project.id} />
        </label>
      ))}
    </div>
  );
}

export default ReportFilters;
