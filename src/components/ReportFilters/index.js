// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resetFilters } from '../../actions/reports';

import './ReportFilters.css';

type ReportFiltersType = {
  projects: Array<projectTreeType & { time: number }>,
  resetFilters: (projects: Array<string>) => void,
};

class ReportFilters extends Component<ReportFiltersType> {
  componentDidMount() {
    this.props.resetFilters(this.props.projects.map(project => project.id));
  }

  render() {
    const { projects } = this.props;

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
}

function mapDispatchToProps(dispatch) {
  return {
    resetFilters(projects: Array<string>) {
      dispatch(resetFilters(projects));
    },
  };
}

export default connect(null, mapDispatchToProps)(ReportFilters);
