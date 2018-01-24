// @flow

import React from 'react';
import { connect } from 'react-redux';
import isThisWeek from 'date-fns/is_this_week';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import subMonths from 'date-fns/sub_months';

import DateRange from '../components/DateRange';
import ThymeTable from '../components/ThymeTable';
import NewTime from '../components/ThymeTable/New';

const now = new Date();
const thisWeek = entry => isThisWeek(entry.date, { weekStartsOn: 1 });
const lastMonth = entry => isAfter(entry.date, subMonths(now, 1));
const older = entry => isBefore(entry.date, subMonths(now, 1));

function dateRangeFilter(dateRange: dateRanges) {
  switch (dateRange) {
    case 'older':
      return older;
    case 'month':
      return lastMonth;
    default:
      return thisWeek;
  }
}

type TimeType = {
  entries: Array<timeType>,
};

function sortByTime(a, b) {
  const aDate = `${a.date} ${a.start}`;
  const bDate = `${b.date} ${b.start}`;

  if (isBefore(aDate, bDate)) {
    return -1;
  }

  if (isAfter(aDate, bDate)) {
    return 1;
  }

  return 0;
}

function Time({ entries }: TimeType) {
  return (
    <div>
      <DateRange />
      <ThymeTable entries={entries} />
      <NewTime />
    </div>
  );
}

function mapStateToProps(state) {
  const { allIds, byId, dateRange } = state.time;

  const entries = allIds.map(id => byId[id]).filter(dateRangeFilter(dateRange));

  // sort entries
  entries.sort(sortByTime);

  return { entries };
}

export default connect(mapStateToProps)(Time);
