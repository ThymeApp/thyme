// @flow

import { combineReducers } from 'redux';

import { register } from 'register/reducer';

import type { ProjectRateCurrency } from './types';

function rate(state = 0, action) {
  switch (action.type) {
    case 'UPDATE_PROJECT':
      return action.rate || 0;
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

export default () => {
  // Project reducers
  register('projects.project', { rate });

  // Settings reducers
  register('settings', { projectRates });
};
