// @flow

import { createSelector } from 'reselect';

const allTheTime = (state) => state.time;
const allTheProjects = (state) => state.projects;
const allTheReports = (state) => state.reports;

export const getDataToExport = createSelector<StateShape, *, ExportShape, *>(
  (state: StateShape) => [allTheTime(state), allTheProjects(state), allTheReports(state)],
  ([time, projects, reports]) => ({ time, projects, reports }),
);
