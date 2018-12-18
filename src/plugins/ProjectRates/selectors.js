// @flow

import { createSelector } from 'reselect';

import { hasCapability } from 'sections/Account/selectors';

import { popular, other } from './currencies';

import type { StoreShapeWithRates, ProjectRatesSettings } from './types';

export const canAddRates = hasCapability('project_rates');

export const projectRatesSettings = (state: StoreShapeWithRates) => state.settings.projectRates;

export const getRatesCurrency = createSelector<StoreShapeWithRates, *, string, *>(
  projectRatesSettings,
  (state: ProjectRatesSettings) => state.currency,
);

export const getRatesCurrencySign = createSelector<StoreShapeWithRates, *, string, *>(
  getRatesCurrency,
  (currency: string) => popular[currency] || other[currency] || '',
);
