// @flow

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';

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
import { getDurationRounding, getDurationAmount, getRoundingOn } from '../selectors/settings';

function toggleFilter(filters: Array<string | null>, filter: string | null) {
  if (filters.indexOf(filter) > -1) {
    return filters.filter(item => item !== filter);
  }

  return [...filters, filter];
}

type ReportsType = {
  history: RouterHistory;
  from: Date | string;
  to: Date | string;
  detailedRound: rounding;
  roundAmount: number;
  report: reportType | null;
  filters: string[];
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
      detailedRound,
      roundAmount,
    } = this.props;

    return (
      <Container className="Reports">
        <Header as="h1">
          Reports
        </Header>
        <ReportRange
          from={from}
          to={to}
          updateDateRange={this.onUpdateDateRange}
        />
        <Grid divided="vertically" stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={12}>
              <ReportCharts projects={projects} />
            </Grid.Column>
            <Grid.Column width={4} floated="right">
              <ReportFilters
                projects={allProjects}
                filters={filters}
                onToggle={this.onToggleFilter}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ReportTable projects={projects} />
        <ReportDetailed
          round={detailedRound}
          roundAmount={roundAmount}
          projects={projects}
        />
        <SavedReports
          from={from}
          to={to}
          filters={filters}
        />
      </Container>
    );
  }
}

function mapStateToProps(state, props) {
  const report = getById(state, props.match.params.reportId) || null;

  const durationRounding = getDurationRounding(state);
  const durationAmount = getDurationAmount(state);
  const roundingOn = getRoundingOn(state);

  const mappedTime = getAllTimeEntries(state);

  const from = report ? report.from : queryStringFrom();
  const to = report ? report.to : queryStringTo();

  const allProjects = [
    { id: null, name: 'No project', nameTree: ['No project'] },
    ...sortedProjects(state),
  ].map(project => ({
    ...project,
    time: totalProjectTime(
      project,
      mappedTime,
      from,
      to,
      roundingOn === 'entries',
      durationRounding,
      durationAmount,
    ),
    entries: [...projectTimeEntries(project, mappedTime, from, to)].sort(sortByTime('asc')),
  }));

  const defaultFilters = allProjects.map(project => project.id);
  const filters = report ? report.filters : queryStringFilters() || defaultFilters;

  return {
    allProjects,
    filters,
    report,
    from,
    to,
    detailedRound: roundingOn === 'entries' ? durationRounding : 'none',
    roundAmount: durationAmount,
    projects: allProjects.filter(project => filters.indexOf(project.id) > -1),
  };
}

export default compose(
  connect(mapStateToProps),
  withRouter,
)(Reports);
