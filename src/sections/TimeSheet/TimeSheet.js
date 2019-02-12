// @flow

import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion/Accordion';
import Pagination from 'semantic-ui-react/dist/commonjs/addons/Pagination/Pagination';

import { render as renderComponent } from 'register/component';

import { useResponsive } from 'components/Responsive';

import { getEntriesPerPage } from '../Settings/selectors';

import DateRange from './components/DateRange';
import DateSort from './components/DateSort';
import TimeTable from './components/Table';
import AddNew from './components/Entry/AddNew';

import { changePage } from './actions';

import { getCurrentTimeEntries, getPage } from './selectors';

import './TimeSheet.css';

type TimeSheetProps = {
  entries: TimeType[];
  now: Date;
  page: number;
  entriesPerPage: number;
  changeEntriesPage: (page: number) => void;
};

function TimeSheet(props: TimeSheetProps) {
  const {
    entries,
    now,
    page,
    entriesPerPage,
    changeEntriesPage,
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
      <AddNew />

      {isMobile ? (
        <Fragment>
          <Accordion fluid>
            <Accordion.Title
              active={filterOpen}
              onClick={() => setFilterOpen(!filterOpen)}
              content="Filters / sorting"
            />
            <Accordion.Content active={filterOpen}>
              <Header as="h5">Date range:</Header>
              <DateRange vertical />
              <Header as="h5">Sort by:</Header>
              <DateSort />
            </Accordion.Content>
          </Accordion>
          <Divider />
        </Fragment>
      ) : (
        <div className="TimeSheet__RangeSort">
          <DateRange />
          <DateSort />
        </div>
      )}

      <div className="TimeSheet__Listing">
        {renderComponent('timesheet.beforeTable', props)}
        <TimeTable
          entries={entries.filter((item, index) => index <= end && index >= start)}
          now={now}
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
  };
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    changeEntriesPage(page: number) {
      dispatch(changePage(page));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet);
