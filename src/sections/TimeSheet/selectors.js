// @flow

import { createSelector } from 'reselect';

import isSameWeek from 'date-fns/is_same_week';
import isSameDay from 'date-fns/is_same_day';
import subDays from 'date-fns/sub_days';
import subMonths from 'date-fns/sub_months';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';

import { sortByTime } from 'core/thyme';

export const getAllTimeEntries = (state: StateShape): TimeType[] => state.time.allIds
  .map((id) => state.time.byId[id])
  .filter((time) => !time.removed);
export const getDateRange = (state: StateShape) => state.time.dateRange;
export const getPage = (state: StateShape) => state.time.page;

const today = (now) => (entry: TimeType) => isSameDay(entry.start, now);
const thisWeek = (now) => (entry: TimeType) => isSameWeek(entry.start, now, { weekStartsOn: 1 });
const weekToDate = (now) => (entry: TimeType) => isAfter(entry.start, subDays(now, 7));
const lastMonth = (now) => (entry: TimeType) => isAfter(entry.start, subMonths(now, 1));
const older = (now) => (entry: TimeType) => isBefore(entry.start, subMonths(now, 1));

function dateRangeFilter(dateRange: DateRanges, now: Date) {
  switch (dateRange) {
    case 'older':
      return older(now);
    case 'month':
      return lastMonth(now);
    case 'week':
      return thisWeek(now);
    case 'weekToDate':
      return weekToDate(now);
    default:
      return today(now);
  }
}

export const getCurrentTimeEntries = (now: Date) => createSelector<StateShape, *, TimeType[], *>(
  (state: StateShape) => ([
    getAllTimeEntries(state),
    getDateRange(state),
  ]),
  ([timeEntries, dateRange]) => {
    const entries = timeEntries.filter(dateRangeFilter(dateRange, now));

    // sort entries
    entries.sort(sortByTime('desc'));

    return entries;
  },
);
