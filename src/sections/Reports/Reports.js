// @flow

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mitt from 'mitt';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';

import {
  totalProjectTime,
  projectTimeEntries,
  sortByTime,
  formatDuration,
} from 'core/thyme';
import {
  queryStringFilters,
  queryStringFrom,
  queryStringTo,
  updateReport,
} from 'core/reportQueryString';

import { create as createTable } from 'register/table';

import { getDurationRounding, getDurationAmount, getRoundingOn } from 'sections/Settings/selectors';
import { sortedProjects } from 'sections/Projects/selectors';
import { getAllTimeEntries } from 'sections/TimeSheet/selectors';

import ActionMenu from './components/ActionMenu';
import ReportCharts from './components/Charts';
import DateRange from './components/DateRange';
import ReportDetailed from './components/Detailed';
import ReportFilters from './components/Filters';
import ReportTable from './components/Table';
import SaveModal from './components/SavedReports/Save';
import LoadModal from './components/SavedReports/Load';

import { getById } from './selectors';

function toggleFilter(filters: Array<string | null>, filter: string | null) {
  if (filters.indexOf(filter) > -1) {
    return filters.filter(item => item !== filter);
  }

  return [...filters, filter];
}

const emitter = mitt();
const ADD_COLUMN = 'reports.add.column';

export function registerTableColumn(id: string, name: string) {
  emitter.emit(ADD_COLUMN, { id, name });
}

type ReportColumn = { name: string, id: string };

type ReportsProps = {
  history: RouterHistory;
  from: Date;
  to: Date;
  detailedRound: rounding;
  roundAmount: number;
  report: reportType | null;
  filters: string[];
  allProjects: Array<projectTreeWithTimeType>;
  projects: Array<projectTreeWithTimeType>;
};

type ReportsState = {
  saveOpened: boolean;
  loadOpened: boolean;
  columns: ReportColumn[];
  hideColumns: Array<string | null>;
};

class Reports extends Component<ReportsProps, ReportsState> {
  state = {
    saveOpened: false,
    loadOpened: false,
    columns: [
      { id: 'project', name: 'Project name' },
      { id: 'total', name: 'Total spent' },
    ],
    hideColumns: [],
  };

  componentDidMount() {
    emitter.on(ADD_COLUMN, this.onAddColumn);
  }

  componentWillUnmount() {
    emitter.off(ADD_COLUMN, this.onAddColumn);
  }

  onAddColumn = (column: any) => {
    const { columns } = this.state;

    this.setState({
      columns: [...columns, column],
    });
  };

  onToggleColumn = (column: string) => {
    const { hideColumns } = this.state;

    this.setState({
      hideColumns: toggleFilter(hideColumns, column),
    });
  };

  onToggleFilter = (filter: string | null) => {
    const nextFilters = toggleFilter(this.currentFilters(), filter);
    const { from, to } = this.currentDateRange();

    this.updateReport(nextFilters, from, to);
  };

  onUpdateDateRange = (from: Date, to: Date) => {
    this.updateReport(this.currentFilters(), from, to);
  };

  onNewReport = () => {
    const { history } = this.props;

    history.push('/reports');
  };

  onOpenSave = () => {
    this.setState({
      saveOpened: true,
    });
  };

  onCloseSave = () => {
    this.setState({
      saveOpened: false,
    });
  };

  onOpenLoad = () => {
    this.setState({
      loadOpened: true,
    });
  };

  onCloseLoad = () => {
    this.setState({
      loadOpened: false,
    });
  };

  currentFilters() {
    const { report, allProjects } = this.props;

    const defaultFilters = allProjects.map(project => project.id);
    return report ? report.filters : queryStringFilters() || defaultFilters;
  }

  currentDateRange() {
    const { report } = this.props;

    const from = report ? report.from : queryStringFrom();
    const to = report ? report.to : queryStringTo();

    return { from, to };
  }

  updateReport(nextFilters, from, to) {
    const { history } = this.props;

    updateReport(nextFilters, from, to, history);
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

    const {
      columns,
      hideColumns,
      saveOpened,
      loadOpened,
    } = this.state;

    const reportTable = createTable(
      'reports', [
        {
          name: 'Project',
          header: () => 'Project',
          row: (project: projectTreeWithTimeType) => project.nameTree.join(' > '),
        },
        {
          name: 'Total spent',
          header: () => 'Total spent',
          footer: (items: projectTreeWithTimeType[]) => formatDuration(
            items.reduce((total, project) => total + (project.time * 60), 0),
          ),
          row: (project: projectTreeWithTimeType) => formatDuration(project.time * 60),
          textAlign: 'right',
          width: 2,
          style: { whiteSpace: 'nowrap' },
        },
      ],
      projects,
    );

    return (
      <Container className="Reports">
        <Grid stackable columns={2} style={{ marginBottom: 0 }}>
          <Grid.Column>
            <Header as="h1">
              Reports
            </Header>
          </Grid.Column>
          <Grid.Column>
            <ActionMenu
              onNew={this.onNewReport}
              onSave={this.onOpenSave}
              onLoad={this.onOpenLoad}
            />
          </Grid.Column>
        </Grid>
        <DateRange
          from={from}
          to={to}
          updateDateRange={this.onUpdateDateRange}
        />
        <ReportCharts projects={projects} />
        {reportTable.filters}
        {reportTable.table}
        <ReportFilters
          projects={allProjects}
          filters={filters}
          columns={columns}
          hideColumns={hideColumns}
          onToggleProject={this.onToggleFilter}
          onToggleColumn={this.onToggleColumn}
        />
        <ReportTable
          hideColumns={hideColumns}
          projects={projects}
        />
        <ReportDetailed
          round={detailedRound}
          roundAmount={roundAmount}
          projects={projects}
        />
        <SaveModal
          isOpen={saveOpened}
          onClose={this.onCloseSave}
          from={from}
          to={to}
          filters={filters}
        />
        <LoadModal
          isOpen={loadOpened}
          onClose={this.onCloseLoad}
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
  withRouter,
  connect(mapStateToProps),
)(Reports);
