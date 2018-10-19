// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion/Accordion';
import Responsive from 'semantic-ui-react/dist/commonjs/addons/Responsive/Responsive';
import Pagination from 'semantic-ui-react/dist/commonjs/addons/Pagination/Pagination';

import { getEntriesPerPage } from '../Settings/selectors';

import DateRange from './components/DateRange';
import DateSort from './components/DateSort';
import TimeTable from './components/Table';

import { changePage } from './actions';

import { getCurrentTimeEntries, getPage } from './selectors';

import './TimeSheet.css';

type TimeSheetProps = {
  entries: Array<timeType>;
  now: Date;
  page: number;
  entriesPerPage: number;
  changeEntriesPage: (page: number) => void;
};

type TimeSheetState = {
  filterOpen: boolean;
}

class TimeSheet extends Component<TimeSheetProps, TimeSheetState> {
  state = {
    filterOpen: false,
  };

  handleToggle = () => {
    const { filterOpen } = this.state;

    this.setState({ filterOpen: !filterOpen });
  };

  handlePaginationChange = (e: Event, { activePage }: { activePage: number }) => {
    const { changeEntriesPage } = this.props;

    changeEntriesPage(activePage);
  };

  render() {
    const {
      entries,
      now,
      page,
      entriesPerPage,
    } = this.props;
    const { filterOpen } = this.state;

    const totalPages = Math.ceil(entries.length / entriesPerPage);
    const start = (page - 1) * entriesPerPage;
    const end = (page * entriesPerPage) - 1;

    return (
      <div className="TimeSheet">
        <Responsive as={Fragment} maxWidth={Responsive.onlyTablet.minWidth}>
          <Accordion fluid>
            <Accordion.Title
              active={filterOpen}
              onClick={this.handleToggle}
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
        </Responsive>
        <Responsive as={Fragment} minWidth={Responsive.onlyTablet.minWidth}>
          <div className="TimeSheet__RangeSort">
            <DateRange />
            <DateSort />
          </div>
        </Responsive>
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
            onPageChange={this.handlePaginationChange}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state: storeShape, props: TimeSheetProps) {
  const { now } = props;

  const currentDate = now || new Date();

  return {
    entries: getCurrentTimeEntries(currentDate)(state),
    now: currentDate,
    page: getPage(state),
    entriesPerPage: getEntriesPerPage(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    changeEntriesPage(page: number) {
      dispatch(changePage(page));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet);
