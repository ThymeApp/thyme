// @flow

import { createSelector } from 'reselect';

export const roundingSettings = (state: StateShape) => state.settings.rounding;
export const timesheetSettings = (state: StateShape) => state.settings.timesheet;
export const advancedSettings = (state: StateShape) => state.settings.advanced;

export const getDurationRounding = createSelector<StateShape, *, Rounding, *>(
  roundingSettings,
  (state: SettingsRounding) => state.durationRounding,
);

export const getDurationAmount = createSelector<StateShape, *, number, *>(
  roundingSettings,
  (state: SettingsRounding) => state.durationRoundingAmount,
);

export const getRoundingOn = createSelector<StateShape, *, RoundableOn, *>(
  roundingSettings,
  (state: SettingsRounding) => state.roundingOn,
);

export const getEntriesPerPage = createSelector<StateShape, *, number, *>(
  timesheetSettings,
  (state: SettingsTimesheet) => state.perPage,
);

export const getEnableNotes = createSelector<StateShape, *, boolean, *>(
  timesheetSettings,
  (state: SettingsTimesheet) => state.enableNotes,
);

export const getEnableProjects = createSelector<StateShape, *, boolean, *>(
  timesheetSettings,
  (state: SettingsTimesheet) => state.enableProjects,
);

export const getEnableEndDate = createSelector<StateShape, *, boolean, *>(
  timesheetSettings,
  (state: SettingsTimesheet) => state.enableEndDate,
);

export const getApiRoot = createSelector<StateShape, *, string, *>(
  advancedSettings,
  (state: SettingsAdvanced) => state.apiRoot,
);
