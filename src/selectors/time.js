// @flow

import { createSelector } from 'reselect';

import isThisWeek from 'date-fns/is_this_week';
import isToday from 'date-fns/is_today';
import subDays from 'date-fns/sub_days';
import subMonths from 'date-fns/sub_months';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';

import { sortByTime } from '../core/thyme';

export const getAllTimeEntries = (state: storeShape): timeType[] => state.time.allIds
  .map(id => state.time.byId[id])
  .filter(time => !time.removed);
export const getDateRange = (state: storeShape) => state.time.dateRange;

const today = (entry: timeType) => isToday(entry.start);
const thisWeek = (entry: timeType) => isThisWeek(entry.start, { weekStartsOn: 1 });
const weekToDate = now => (entry: timeType) => isAfter(entry.start, subDays(now, 7));
const lastMonth = now => (entry: timeType) => isAfter(entry.start, subMonths(now, 1));
const older = now => (entry: timeType) => isBefore(entry.start, subMonths(now, 1));

function dateRangeFilter(dateRange: dateRanges, now: Date) {
  switch (dateRange) {
    case 'older':
      return older(now);
    case 'month':
      return lastMonth(now);
    case 'week':
      return thisWeek;
    case 'weekToDate':
      return weekToDate(now);
    default:
      return today;
  }
}

export const getCurrentTimeEntries = (now: Date) => createSelector(
  [getAllTimeEntries, getDateRange],
  (timeEntries, dateRange) => {
    const entries = timeEntries.filter(dateRangeFilter(dateRange, now));

    // sort entries
    entries.sort(sortByTime);

    return entries;
  },
);
