// @flow

import { createSelector } from 'reselect';

import { hasCapability } from 'sections/Account/selectors';

import { popular, other } from './currencies';

import type { StoreShapeWithRates, ProjectRatesSettings } from './types';

export const canAddRates = hasCapability('project_rates');

export const projectRatesSettings = (state: StoreShapeWithRates) => state.settings.projectRates;

export const getRatesCurrency = createSelector(
  projectRatesSettings,
  (state: ProjectRatesSettings) => state.currency,
);

export const getRatesCurrencySign = createSelector(
  getRatesCurrency,
  (currency: string) => popular[currency] || other[currency] || '',
);
