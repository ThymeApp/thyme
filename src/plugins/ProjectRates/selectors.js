// @flow

import { createSelector } from 'reselect';

import { popular, other } from './currencies';

import type { StoreShapeWithRates, ProjectRatesSettings } from './types';

export const projectRatesSettings = (state: StoreShapeWithRates) => state.settings.projectRates;

export const getRatesCurrency = createSelector<StoreShapeWithRates, *, string, *>(
  projectRatesSettings,
  (state: ProjectRatesSettings) => state.currency,
);

export const getRatesCurrencySign = createSelector<StoreShapeWithRates, *, string, *>(
  getRatesCurrency,
  (currency: string) => popular[currency] || other[currency] || '',
);
