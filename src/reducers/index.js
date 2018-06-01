// @flow

import { combineReducers } from 'redux';
import formReducer from 'redux-form/lib/reducer';

import runMigrations from '../migrations';

import app from './app';
import time from './time';
import projects from './projects';
import reports from './reports';

const combinedReducers = combineReducers({
  app,
  time,
  projects,
  reports,
  form: formReducer,
});

export default (state: any, action: { type: string }) => {
  // allow to run migrations on store data by action
  if (action.type === 'MIGRATE_STORE_DATA') {
    return runMigrations(state);
  }

  return combinedReducers(state, action);
};
