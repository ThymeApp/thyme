// @flow

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import reports from 'sections/Reports/reducers';
import settings from 'sections/Settings/reducers';

import runMigrations from '../migrations';

import account from './account';
import app from './app';
import projects from './projects';
import time from './time';

const combinedReducers = combineReducers({
  account,
  app,
  projects,
  reports,
  time,
  settings,
  form: formReducer,
});

export default (state: any, action: { type: string }) => {
  // allow to run migrations on store data by action
  if (action.type === 'MIGRATE_STORE_DATA') {
    return runMigrations(state);
  }

  return combinedReducers(state, action);
};
