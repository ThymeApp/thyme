// @flow

import { createSelector } from 'reselect';

export const roundingSettings = (state: storeShape) => state.settings.rounding;

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
