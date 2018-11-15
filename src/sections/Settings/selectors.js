// @flow

import { createSelector } from 'reselect';

export const roundingSettings = (state: StateShape) => state.settings.rounding;
export const timesheetSettings = (state: StateShape) => state.settings.timesheet;
export const advancedSettings = (state: StateShape) => state.settings.advanced;

export const getDurationRounding = createSelector(
  roundingSettings,
  (state: SettingsRounding) => state.durationRounding,
);

export const getDurationAmount = createSelector(
  roundingSettings,
  (state: SettingsRounding) => state.durationRoundingAmount,
);

export const getRoundingOn = createSelector(
  roundingSettings,
  (state: SettingsRounding) => state.roundingOn,
);

export const getEntriesPerPage = createSelector(
  timesheetSettings,
  (state: SettingsTimesheet) => state.perPage,
);

export const getEnableNotes = createSelector(
  timesheetSettings,
  (state: SettingsTimesheet) => state.enableNotes,
);

export const getEnableProjects = createSelector(
  timesheetSettings,
  (state: SettingsTimesheet) => state.enableProjects,
);

export const getEnableEndDate = createSelector(
  timesheetSettings,
  (state: SettingsTimesheet) => state.enableEndDate,
);

export const getApiRoot = createSelector(
  advancedSettings,
  (state: SettingsAdvanced) => state.apiRoot,
);
