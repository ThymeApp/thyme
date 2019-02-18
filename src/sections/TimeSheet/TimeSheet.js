// @flow

import React, { useState } from 'react';
import { connect } from 'react-redux';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion/Accordion';
import Pagination from 'semantic-ui-react/dist/commonjs/addons/Pagination/Pagination';

import { render as renderComponent } from 'register/component';

import { useResponsive } from 'components/Responsive';

import { addProject } from 'sections/Projects/actions';

import {
  getEnableEndDate,
  getEnableNotes,
  getEnableProjects,
  getEntriesPerPage,
} from '../Settings/selectors';

import DateRange from './components/DateRange';
import TimeTable from './components/Table';
import { NewEntry } from './components/Entry';

import { changePage, updateTime } from './actions';

import { getCurrentTimeEntries, getPage } from './selectors';

import './TimeSheet.css';

type TimeSheetProps = {
  entries: TimeType[];
  now: Date;
  page: number;
  entriesPerPage: number;
  changeEntriesPage: (page: number) => void;
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  onAddProject: (project: string) => string;
};

function TimeSheet(props: TimeSheetProps) {
  const {
    entries,
    now,
    page,
    entriesPerPage,
    changeEntriesPage,
    enabledNotes,
    enabledProjects,
    enabledEndDate,
    onAddProject,
  } = props;
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [isMobile] = useResponsive({ max: 'tablet' });

  const totalPages = Math.ceil(entries.length / entriesPerPage);
  const start = (page - 1) * entriesPerPage;
  const end = (page * entriesPerPage) - 1;

  const onPageChange = (
    e: Event,
    { activePage }: { activePage: number },
  ) => changeEntriesPage(activePage);

  return (
    <div className="TimeSheet">
      <NewEntry
        now={now}
        enabledNotes={enabledNotes}
        enabledProjects={enabledProjects}
        enabledEndDate={enabledEndDate}
      />

      {isMobile ? (
        <div className="TimeSheet__MobileRangeSort">
          <Accordion fluid>
            <Accordion.Title
              active={filterOpen}
              onClick={() => setFilterOpen(!filterOpen)}
              content="Date range"
            />
            <Accordion.Content active={filterOpen}>
              <DateRange vertical />
            </Accordion.Content>
          </Accordion>
          <Divider />
        </div>
      ) : (
        <div className="TimeSheet__RangeSort">
          <DateRange />
        </div>
      )}

      <div className="TimeSheet__Listing">
        {renderComponent('timesheet.beforeTable', props)}
        {totalPages === 0 && (
          <Header style={{ textAlign: 'center' }} as="h4">No entries in this date range.</Header>
        )}

        <TimeTable
          entries={entries.filter((item, index) => index <= end && index >= start)}
          now={now}
          enabledNotes={enabledNotes}
          enabledProjects={enabledProjects}
          enabledEndDate={enabledEndDate}
          onAddProject={onAddProject}
        />
        {totalPages > 1 && (
          <Pagination
            firstItem={null}
            lastItem={null}
            activePage={page}
            totalPages={totalPages}
            siblingRange={2}
            onPageChange={onPageChange}
          />
        )}
        {renderComponent('timesheet.afterTable', props)}
      </div>
    </div>
  );
}

function mapStateToProps(state: StateShape, props: TimeSheetProps) {
  const { now } = props;

  const currentDate = now || new Date();

  return {
    entries: getCurrentTimeEntries(currentDate)(state),
    now: currentDate,
    page: getPage(state),
    entriesPerPage: getEntriesPerPage(state),
    enabledNotes: getEnableNotes(state),
    enabledProjects: getEnableProjects(state),
    enabledEndDate: getEnableEndDate(state),
  };
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    changeEntriesPage(page: number) {
      dispatch(changePage(page));
    },
    onAddProject(project, entry) {
      const newProjectAction = addProject({ parent: null, name: project });

      const projectId = newProjectAction.id;

      dispatch(newProjectAction);
      dispatch(updateTime({ ...entry, project: projectId }));

      return newProjectAction.id;
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet);
