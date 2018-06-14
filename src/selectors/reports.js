// @flow

export const getAllReports = (state: storeShape): reportType[] =>
  state.reports.allIds
    .map(id => state.reports.byId[id])
    .filter(report => !report.removed);
export const getFilters = (state: storeShape) => state.reports.filters;
export const getFrom = (state: storeShape) => state.reports.from;
export const getTo = (state: storeShape) => state.reports.to;
