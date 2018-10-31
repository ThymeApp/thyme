// @flow

import { createSelector } from 'reselect';

import { hasCapability } from 'sections/Account/selectors';

import type { StoreShapeWithRates, ProjectRatesSettings } from './types';

export const canAddRates = hasCapability('project_rates');

export const projectRatesSettings = (state: StoreShapeWithRates) => state.settings.projectRates;

export const getRatesCurrency = createSelector(
  projectRatesSettings,
  (state: ProjectRatesSettings) => state.currency,
);
