// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { RouterHistory } from 'react-router';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';

import { trackPageview } from 'core/analytics';
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
import { treeDisplayName } from 'core/projects';

import { create as createTable } from 'register/table';
import { render as renderComponent } from 'register/component';

import {
  getDurationRounding,
  getDurationAmount,
  getRoundingOn,
  getEnableEndDate,
} from 'sections/Settings/selectors';
import { sortedProjects } from 'sections/Projects/selectors';
import { getAllTimeEntries } from 'sections/TimeSheet/selectors';
import { hasPremium, isLoaded } from 'sections/Account/selectors';

import BuyMessage from 'components/BuySubscription/Message';

import ActionMenu from './components/ActionMenu';
import ReportCharts from './components/Charts';
import DateRange from './components/DateRange';
import ReportDetailed from './components/Detailed';
import ReportFilters from './components/Filters';
import SaveModal from './components/SavedReports/Save';
import LoadModal from './components/SavedReports/Load';
import PrintCredits from './components/Credits';

import { getById } from './selectors';

function toggleFilter(filters: Array<string | null>, filter: string | null) {
  if (filters.indexOf(filter) > -1) {
    return filters.filter((item) => item !== filter);
  }

  return [...filters, filter];
}

export type ReportsProps = {
  showUpgrade: boolean;
  enabledEndDate: boolean;
  history: RouterHistory;
  from: Date;
  to: Date;
  detailedRound: Rounding;
  roundAmount: number;
  report: ReportType | null;
  filters: string[];
  allProjects: ProjectTreeWithTimeType[];
  projects: ProjectTreeWithTimeType[];
};

type ReportsState = {
  saveOpened: boolean;
  loadOpened: boolean;
};

class Reports extends Component<ReportsProps, ReportsState> {
  constructor() {
    super();

    this.state = {
      saveOpened: false,
      loadOpened: false,
    };
  }

  componentDidMount() {
    trackPageview('Reports');
  }

  onToggleFilter = (filter: string | null) => {
    const nextFilters = toggleFilter(this.currentFilters(), filter);
    const { from, to } = this.currentDateRange();

    this.updateReport(nextFilters, from, to);
  };

  onUpdateDateRange = (from: Date, to: Date) => {
    this.updateReport(this.currentFilters(), from, to);
  };

  onDownload = () => {
    const {
      from,
      to,
      projects,
      report,
    } = this.props;

    const projectWithTime = projects.filter((project) => project.time > 0);

    // only import when using
    import('./helpers/downloadPdf')
      .then((m) => m.default)
      .then((downloadPdf) => downloadPdf({
        from,
        to,
        projects: projectWithTime,
        report,
      }));
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

    const defaultFilters = allProjects.map((project) => project.id);
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
      filters,
      projects,
      allProjects,
      from,
      to,
      detailedRound,
      roundAmount,
      enabledEndDate,
      showUpgrade,
    } = this.props;

    const {
      saveOpened,
      loadOpened,
    } = this.state;

    const projectsWithTime = projects.filter((project) => project.time > 0);
    const allProjectsWithTime = allProjects.filter((project) => project.time > 0);

    const reportTable = createTable(
      'reports', [
        {
          name: 'Project',
          header: () => 'Project',
          row: (project: ProjectTreeWithTimeType) => (
            <>
              {project.colour && (
                <Label
                  circular
                  size="small"
                  color={project.colour}
                  empty
                  style={{ marginRight: 5 }}
                />
              )}
              {treeDisplayName(project)}
            </>
          ),
        },
        {
          name: 'Total spent',
          header: () => 'Total spent',
          footer: (items: ProjectTreeWithTimeType[]) => formatDuration(
            items.reduce((total, project) => total + (project.time * 60), 0),
          ),
          row: (project: ProjectTreeWithTimeType) => formatDuration(project.time * 60),
          textAlign: 'right',
          collapsing: true,
          style: { whiteSpace: 'nowrap' },
        },
      ],
      projectsWithTime,
      { className: 'ReportsTable' },
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
              onDownload={this.onDownload}
            />
          </Grid.Column>
        </Grid>
        <DateRange
          from={from}
          to={to}
          updateDateRange={this.onUpdateDateRange}
        />
        {renderComponent('reports.beforeCharts', this.props)}
        <ReportCharts projects={projectsWithTime} />
        {showUpgrade && false && (
          <BuyMessage>Want more insights in your day to day tracked time?</BuyMessage>
        )}
        {renderComponent('reports.afterCharts', this.props)}
        {projectsWithTime.length > 0 && (
          <ReportFilters
            projects={allProjectsWithTime}
            filters={filters}
            columnFilters={reportTable.filters}
            onToggleProject={this.onToggleFilter}
          />
        )}
        {projectsWithTime.length > 0 && reportTable.table}
        <ReportDetailed
          round={detailedRound}
          roundAmount={roundAmount}
          projects={projectsWithTime}
          enabledEndDate={enabledEndDate}
        />
        {showUpgrade && <PrintCredits />}
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
  ].map((project) => ({
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

  const defaultFilters = allProjects.map((project) => project.id);
  const filters = report ? report.filters : queryStringFilters() || defaultFilters;

  return {
    allProjects,
    filters,
    report,
    from,
    to,
    detailedRound: roundingOn === 'entries' ? durationRounding : 'none',
    roundAmount: durationAmount,
    projects: allProjects.filter((project) => filters.indexOf(project.id) > -1),
    enabledEndDate: getEnableEndDate(state),
    showUpgrade: !hasPremium(state) && isLoaded(state),
  };
}

export default connect(mapStateToProps)(Reports);
