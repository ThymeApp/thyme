// @flow

import shortid from 'shortid';

export function resetFilters(filters: Array<string>) {
  return {
    type: 'RESET_FILTERS',
    filters,
  };
}

export function toggleFilter(filter: string | null) {
  return {
    type: 'TOGGLE_FILTER',
    filter,
  };
}

export function updateDateRange(from: Date, to: Date) {
  return {
    type: 'UPDATE_DATE_RANGE',
    from,
    to,
  };
}

export function addReport(name: string, filters: Array<string>, from: Date, to: Date) {
  return {
    type: 'ADD_REPORT',
    id: shortid.generate(),
    name,
    filters,
    from,
    to,
  };
}

export function removeReport(id: string) {
  return { type: 'REMOVE_REPORT', id };
}
