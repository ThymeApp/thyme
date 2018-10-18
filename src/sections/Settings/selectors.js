// @flow

import { createSelector } from 'reselect';

export const roundingSettings = (state: storeShape) => state.settings.rounding;
export const timesheetSettings = (state: storeShape) => state.settings.timesheet;

export const getDurationRounding = createSelector(
  roundingSettings,
  (state: settingsRounding) => state.durationRounding,
);

export const getDurationAmount = createSelector(
  roundingSettings,
  (state: settingsRounding) => state.durationRoundingAmount,
);

export const getRoundingOn = createSelector(
  roundingSettings,
  (state: settingsRounding) => state.roundingOn,
);

export const getEntriesPerPage = createSelector(
  timesheetSettings,
  (state: settingsTimesheet) => state.perPage,
);

export const getEnableNotes = createSelector(
  timesheetSettings,
  (state: settingsTimesheet) => state.enableNotes,
);

export const getEnableProjects = createSelector(
  timesheetSettings,
  (state: settingsTimesheet) => state.enableProjects,
);

export const getEnableEndDate = createSelector(
  timesheetSettings,
  (state: settingsTimesheet) => state.enableEndDate,
);
