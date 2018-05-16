// @flow

import { combineReducers } from 'redux';

import runMigrations from '../migrations';

import app from './app';
import time from './time';
import projects from './projects';
import reports from './reports';
import settings from './settings';

const combinedReducers = combineReducers({
  app,
  time,
  projects,
  reports,
  settings,
});

export default (state: any, action: { type: string }) => {
  // allow to run migrations on store data by action
  if (action.type === 'MIGRATE_STORE_DATA') {
    return runMigrations(state);
  }

  return combinedReducers(state, action);
};
