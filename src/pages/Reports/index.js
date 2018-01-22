// @flow

import React from 'react';
import { connect } from 'react-redux';

import { sortedProjects } from '../../core/projects';
import { totalProjectTime } from '../../core/thyme';

import ReportTable from '../../components/ReportTable';

import './Reports.css';

type ReportsType = {
  projects: Array<projectTreeType & { time: number }>,
};

function Reports({ projects }: ReportsType) {
  return (
    <div>
      <div className="Report__header">
        <h2 className="Report__title">This week</h2>
        <span className="Report__header-date">(15-21 January 2018)</span>
        <div className="Report__period">
          <select name="period">
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="custom">Custom range</option>
          </select>
        </div>
      </div>
      <div className="Report__filters">
        <span className="Report__filters-label">Show:</span>
        {projects.map(project => (
          <label className="Report__filter" key={project.id} htmlFor={project.id}>
            <span className="Report__filter-name">{project.name}</span>
            <input defaultChecked type="checkbox" name={project.id} id={project.id} />
          </label>
        ))}
      </div>
      <ReportTable projects={projects} />
    </div>
  );
}

function mapStateToProps(state) {
  const { projects, time } = state;

  const mappedTime = time.allIds.map(id => time.byId[id]);

  const from = '2018-01-15';
  const to = '2018-01-21';

  const allProjects = [
    { id: null, nameTree: ['No project'] },
    ...sortedProjects(projects.allIds.map(id => projects.byId[id])),
  ].map(project => ({
    ...project,
    time: totalProjectTime(project, mappedTime, from, to) / 60,
  }));

  return {
    projects: allProjects,
  };
}

export default connect(mapStateToProps)(Reports);
