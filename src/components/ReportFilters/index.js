// @flow

import React, { Component } from 'react';

import './ReportFilters.css';

type ReportFiltersType = {
  filters: Array<string>;
  projects: Array<projectTreeWithTimeType>;
  onToggle: (project: string | null) => void;
};

class ReportFilters extends Component<ReportFiltersType> {
  onFilterToggle = (e: Event) => {
    if (e.target instanceof HTMLInputElement && typeof e.target.name === 'string') {
      this.props.onToggle(e.target.name);
    }
  };

  render() {
    const { filters, projects } = this.props;

    return (
      <div className="Report__filters">
        <span className="Report__filters-label">Show:</span>
        {projects.map(project => (
          <label className="Report__filter" key={project.id} htmlFor={project.id}>
            <span className="Report__filter-name">{project.name}</span>
            <input
              checked={filters.indexOf(project.id) > -1}
              onChange={this.onFilterToggle}
              type="checkbox"
              name={project.id}
              id={project.id}
            />
          </label>
        ))}
      </div>
    );
  }
}

export default ReportFilters;
