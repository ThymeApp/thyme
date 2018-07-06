// @flow

export const getAllReports = (state: storeShape): reportType[] =>
  state.reports.allIds
    .map(id => state.reports.byId[id])
    .filter(report => !report.removed);
export const getById = (state: storeShape, id: string): reportType => state.reports.byId[id];
