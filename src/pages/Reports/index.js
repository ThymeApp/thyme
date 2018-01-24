// @flow

import React from 'react';
import { connect } from 'react-redux';

import { sortedProjects } from '../../core/projects';
import { totalProjectTime } from '../../core/thyme';

import ReportTable from '../../components/ReportTable';
import ReportFilters from '../../components/ReportFilters';
import ReportRange from '../../components/ReportRange';
import ReportCharts from '../../components/ReportCharts';

import './Reports.css';

type ReportsType = {
  allProjects: Array<projectTreeType>,
  projects: Array<projectTreeType & { time: number }>,
};

function Reports({ allProjects, projects }: ReportsType) {
  return (
    <div>
      <div className="Report__header">
        <h2 className="Report__title">Reports</h2>
        <ReportRange />
      </div>
      <ReportFilters projects={allProjects} />
      <ReportCharts projects={projects} />
      <ReportTable projects={projects} />
    </div>
  );
}

function mapStateToProps(state) {
  const { projects, time, reports } = state;
  const { filters, from, to } = reports;

  const mappedTime = time.allIds.map(id => time.byId[id]);

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
