// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';

import { totalProjectTime, projectTimeEntries, sortByTime } from '../core/thyme';

import ReportTable from '../components/ReportTable';
import ReportFilters from '../components/ReportFilters';
import ReportRange from '../components/ReportRange';
import ReportCharts from '../components/ReportCharts';
import ReportDetailed from '../components/ReportDetailed';
import SavedReports from '../components/SavedReports';

import { sortedProjects } from '../selectors/projects';
import { getAllTimeEntries } from '../selectors/time';
import { getFilters, getFrom, getTo, getById } from '../selectors/reports';

function currentQueryString() {
  return queryString.parse(window.location.search);
}

function queryStringFilters() {
  return currentQueryString().filter;
}

type ReportsType = {
  report: reportType | {};
  filters: string[],
  allProjects: Array<projectTreeWithTimeType>;
  projects: Array<projectTreeWithTimeType>;
};

class Reports extends Component<ReportsType> {
  onToggleFilter = (filter: string | null) => {
    const defaultFilters = this.props.allProjects.map(project => project.id);
    const currentFilters = this.props.report.filters || queryStringFilters() || defaultFilters;

    console.log(filter, currentFilters);
  };

  render() {
    const { allProjects, filters, projects } = this.props;

    return (
      <Container>
        <Menu style={{ border: 0, boxShadow: 'none' }}>
          <Menu.Header as="h1" style={{ margin: 0 }}>Reports</Menu.Header>
          <Menu.Menu position="right">
            <ReportRange />
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
        <SavedReports />
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  const report = getById(state, props.match.params.reportId) || {};

  const mappedTime = getAllTimeEntries(state);
  const from = report.from || getFrom(state);
  const to = report.to || getTo(state);

  const allProjects = [
    { id: null, name: 'No project', nameTree: ['No project'] },
    ...sortedProjects(state),
  ].map(project => ({
    ...project,
    time: totalProjectTime(project, mappedTime, from, to) / 60,
    entries: [...projectTimeEntries(project, mappedTime, from, to)].sort(sortByTime),
  }));

  const defaultFilters = allProjects.map(project => project.id);
  const filters = report.filters || queryStringFilters() || defaultFilters;

  return {
    allProjects,
    filters,
    report,
    projects: allProjects.filter(project => filters.indexOf(project.id) > -1),
  };
}

export default connect(mapStateToProps)(Reports);
