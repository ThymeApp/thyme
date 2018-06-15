// @flow

import { createSelector } from 'reselect';

const allTheTime = state => state.time;
const allTheProjects = state => state.projects;
const allTheReports = state => state.reports;

export const getDataToExport = createSelector(
  [allTheTime, allTheProjects, allTheReports],
  (time, projects, reports) => ({ time, projects, reports }),
);
