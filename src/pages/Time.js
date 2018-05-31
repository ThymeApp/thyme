// @flow

import React from 'react';
import { connect } from 'react-redux';
import isToday from 'date-fns/is_today';
import isThisWeek from 'date-fns/is_this_week';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import subMonths from 'date-fns/sub_months';
import subDays from 'date-fns/sub_days';

import DateRange from '../components/DateRange';
import ThymeTable from '../components/ThymeTable';

import { sortByTime } from '../core/thyme';

const now = new Date();
const today = (entry: timeType) => isToday(entry.start);
const thisWeek = (entry: timeType) => isThisWeek(entry.start, { weekStartsOn: 1 });
const weekToDate = (entry: timeType) => isAfter(entry.start, subDays(now, 7));
const lastMonth = (entry: timeType) => isAfter(entry.start, subMonths(now, 1));
const older = (entry: timeType) => isBefore(entry.start, subMonths(now, 1));

function dateRangeFilter(dateRange: dateRanges) {
  switch (dateRange) {
    case 'older':
      return older;
    case 'month':
      return lastMonth;
    case 'week':
      return thisWeek;
    case 'weekToDate':
      return weekToDate;
    default:
      return today;
  }
}

type TimeType = {
  entries: Array<timeType>,
};

function Time({ entries }: TimeType) {
  return (
    <div style={{ paddingLeft: '1%', paddingRight: '1%' }}>
      <DateRange />
      <ThymeTable entries={entries} />
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
