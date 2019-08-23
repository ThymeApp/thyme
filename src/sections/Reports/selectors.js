// @flow

export const getAllReports = (state: StateShape): ReportType[] => state.reports.allIds
  .map((id) => state.reports.byId[id])
  .filter((report) => !report.removed);
export const getById = (state: StateShape, id: string): ReportType => state.reports.byId[id];
