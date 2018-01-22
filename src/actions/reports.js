// @flow

export function resetFilters(filters: Array<string>) {
  return {
    type: 'RESET_FILTERS',
    filters,
  };
}
