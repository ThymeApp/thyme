// @flow

import React from 'react';
import { connect } from 'react-redux';

import { sortedProjects } from '../../core/projects';
import { totalProjectTime } from '../../core/thyme';

import ReportTable from '../../components/ReportTable';
import ReportFilters from '../../components/ReportFilters';

import './Reports.css';

type ReportsType = {
  allProjects: Array<projectTreeType>,
  projects: Array<projectTreeType & { time: number }>,
};

function Reports({ allProjects, projects }: ReportsType) {
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
      <ReportFilters projects={allProjects} />
      <ReportTable projects={projects} />
    </div>
  );
}

function mapStateToProps(state) {
  const { projects, time, reports } = state;
  const { filters } = reports;

  const mappedTime = time.allIds.map(id => time.byId[id]);

  const from = '2017-12-21';
  const to = '2018-01-16';

  const allProjects = [
    { id: null, name: 'No project', nameTree: ['No project'] },
    ...sortedProjects(projects.allIds.map(id => projects.byId[id])),
  ].map(project => ({
    ...project,
    time: totalProjectTime(project, mappedTime, from, to) / 60,
  }));

  return {
    allProjects,
    projects: allProjects.filter(project => filters.indexOf(project.id) > -1),
  };
}

export default connect(mapStateToProps)(Reports);