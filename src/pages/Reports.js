// @flow

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';

import { totalProjectTime, projectTimeEntries, sortByTime } from '../core/thyme';
import {
  queryStringFilters,
  queryStringFrom,
  queryStringTo,
  updateReport,
} from '../core/reportQueryString';

import ReportTable from '../components/ReportTable';
import ReportFilters from '../components/ReportFilters';
import ReportRange from '../components/ReportRange';
import ReportCharts from '../components/ReportCharts';
import ReportDetailed from '../components/ReportDetailed';
import SavedReports from '../components/SavedReports';

import { sortedProjects } from '../selectors/projects';
import { getAllTimeEntries } from '../selectors/time';
import { getById } from '../selectors/reports';

function toggleFilter(filters: Array<string | null>, filter: string | null) {
  if (filters.indexOf(filter) > -1) {
    return filters.filter(item => item !== filter);
  }

  return [...filters, filter];
}

type ReportsType = {
  history: RouterHistory;
  from: Date | string,
  to: Date | string,
  report: reportType | null;
  filters: string[],
  allProjects: Array<projectTreeWithTimeType>;
  projects: Array<projectTreeWithTimeType>;
};

class Reports extends Component<ReportsType> {
  onToggleFilter = (filter: string | null) => {
    const nextFilters = toggleFilter(this.currentFilters(), filter);
    const { from, to } = this.currentDateRange();

    this.updateReport(nextFilters, from, to);
  };

  onUpdateDateRange = (from: Date, to: Date) => {
    this.updateReport(this.currentFilters(), from, to);
  };

  updateReport(nextFilters, from, to) {
    const { history } = this.props;

    updateReport(nextFilters, from, to, history);
  }

  currentDateRange() {
    const { report } = this.props;

    const from = report ? report.from : queryStringFrom();
    const to = report ? report.to : queryStringTo();

    return { from, to };
  }

  currentFilters() {
    const { report, allProjects } = this.props;

    const defaultFilters = allProjects.map(project => project.id);
    return report ? report.filters : queryStringFilters() || defaultFilters;
  }

  render() {
    const {
      allProjects,
      filters,
      projects,
      from,
      to,
    } = this.props;

    return (
      <Container>
        <Menu style={{ border: 0, boxShadow: 'none' }}>
          <Menu.Header as="h1" style={{ margin: 0 }}>Reports</Menu.Header>
          <Menu.Menu position="right">
            <ReportRange
              from={from}
              to={to}
              updateDateRange={this.onUpdateDateRange}
            />
          </Menu.Menu>
        </Menu>
        <ReportFilters
          projects={allProjects}
          filters={filters}
          onToggle={this.onToggleFilter}
        />
        <ReportCharts projects={projects} />
        <ReportTable projects={projects} />
        <ReportDetailed projects={projects} />
        <SavedReports filters={filters} />
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  const report = getById(state, props.match.params.reportId) || null;

  const mappedTime = getAllTimeEntries(state);

  const from = report ? report.from : queryStringFrom();
  const to = report ? report.to : queryStringTo();

  const allProjects = [
    { id: null, name: 'No project', nameTree: ['No project'] },
    ...sortedProjects(state),
  ].map(project => ({
    ...project,
    time: totalProjectTime(project, mappedTime, from, to) / 60,
    entries: [...projectTimeEntries(project, mappedTime, from, to)].sort(sortByTime),
  }));

  const defaultFilters = allProjects.map(project => project.id);
  const filters = report ? report.filters : queryStringFilters() || defaultFilters;

  return {
    allProjects,
    filters,
    report,
    from,
    to,
    projects: allProjects.filter(project => filters.indexOf(project.id) > -1),
  };
}

export default compose(
  connect(mapStateToProps),
  withRouter,
)(Reports);
