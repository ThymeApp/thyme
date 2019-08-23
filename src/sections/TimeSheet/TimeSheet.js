// @flow

import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion/Accordion';
import Pagination from 'semantic-ui-react/dist/commonjs/addons/Pagination/Pagination';

import { useTrackPageview } from 'core/analytics';
import { useActions } from 'core/useActions';

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
import NewEntry from './components/Entry/New';

import { changePage, updateTime } from './actions';

import { getCurrentTimeEntries, getPage } from './selectors';

import './TimeSheet.css';

type TimeSheetProps = {
  now?: Date;
};

function TimeSheet(props: TimeSheetProps) {
  useTrackPageview('TimeSheet');

  const { now } = props;

  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [isMobile] = useResponsive({ max: 'tablet' });

  const {
    entries,
    now: mappedNow,
    page,
    entriesPerPage,
    enabledNotes,
    enabledProjects,
    enabledEndDate,
  } = useSelector((state) => {
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
  }, [now]);

  const dispatch = useDispatch();
  const changeEntriesPage = useActions(changePage);
  const onAddProject = useCallback((project, entry?: any): string => {
    const newProjectAction = addProject({
      colour: null,
      name: project,
      parent: null,
    });

    const projectId = newProjectAction.id;

    dispatch(newProjectAction);

    if (entry) {
      dispatch(updateTime({
        ...entry,
        project: projectId,
      }));
    }

    return newProjectAction.id;
  }, [dispatch]);

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
        now={mappedNow}
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
          now={mappedNow}
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

export default TimeSheet;
