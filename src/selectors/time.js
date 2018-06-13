// @flow

import { createSelector } from 'reselect';

import isThisWeek from 'date-fns/is_this_week';
import isToday from 'date-fns/is_today';
import subDays from 'date-fns/sub_days';
import subMonths from 'date-fns/sub_months';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';

import { sortByTime } from '../core/thyme';

const getAllTimeEntries = state =>
  state.time.allIds
    .map(id => state.time.byId[id])
    .filter(time => !time.removed);
const getDateRange = state => state.time.dateRange;

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

export const getCurrentTimeEntries = createSelector(
  [getAllTimeEntries, getDateRange],
  (timeEntries, dateRange) => {
    const entries = timeEntries.filter(dateRangeFilter(dateRange));

    // sort entries
    entries.sort(sortByTime);

    return entries;
  },
);
