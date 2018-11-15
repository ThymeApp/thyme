// @flow

export function addTime(entry: TimePropertyType) {
  return {
    type: 'ADD_TIME',
    ...entry,
  };
}

export function updateTime(entry: { id: string } & TimePropertyType) {
  return {
    type: 'UPDATE_TIME',
    ...entry,
  };
}

export function removeTime(id: string) {
  return {
    type: 'REMOVE_TIME',
    id,
  };
}

export function truncateTime() {
  return { type: 'TRUNCATE_TIME' };
}

export function changeDateRange(dateRange: DateRanges) {
  return {
    type: 'CHANGE_DATE_RANGE',
    dateRange,
  };
}

export function changeDateSort(dateSort: SortDirection) {
  return {
    type: 'CHANGE_DATE_SORT',
    dateSort,
  };
}

export function changePage(page: number) {
  return {
    type: 'CHANGE_PAGE',
    page,
  };
}
