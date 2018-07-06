// @flow

export const getAllReports = (state: storeShape): reportType[] =>
  state.reports.allIds
    .map(id => state.reports.byId[id])
    .filter(report => !report.removed);
export const getById = (state: storeShape, id: string): reportType => state.reports.byId[id];

// TODO: remove
export const getFilters = (state: storeShape) => state.reports.filters;
export const getFrom = (state: storeShape) => state.reports.from;
export const getTo = (state: storeShape) => state.reports.to;
