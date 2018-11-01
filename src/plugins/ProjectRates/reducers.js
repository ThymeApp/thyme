// @flow

import { combineReducers } from 'redux';

import { registerReducer } from 'reducers/registerReducer';

import type { ProjectRateCurrency } from './types';

function rate(state = 0, action) {
  switch (action.type) {
    case 'UPDATE_PROJECT':
      return action.rate;
    default:
      return state;
  }
}

function currency(state: ProjectRateCurrency = 'EUR', action): ProjectRateCurrency {
  switch (action.type) {
    case 'UPDATE_PROJECT_RATES_CURRENCY':
      return action.currency;
    default:
      return state;
  }
}

const projectRates = combineReducers({ currency });

export default (store: ThymeStore) => {
  // Project reducers
  registerReducer(store, 'projects.project', { rate });

  // Settings reducers
  registerReducer(store, 'settings', { projectRates });
};
