// @flow

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
