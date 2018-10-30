// @flow

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import reports from 'sections/Reports/reducers';
import settings from 'sections/Settings/reducers';
import createProjectsReducers from 'sections/Projects/reducers';
import account from 'sections/Account/reducers';
import time from 'sections/TimeSheet/reducers';

import runMigrations from '../migrations';

import app from './app';

export default () => {
  const combinedReducers = combineReducers({
    account,
    app,
    projects: createProjectsReducers(),
    reports,
    time,
    settings,
    form: formReducer,
  });

  return (state: any, action: { type: string }) => {
    // allow to run migrations on store data by action
    if (action.type === 'MIGRATE_STORE_DATA') {
      return runMigrations(state);
    }

    return combinedReducers(state, action);
  };
};
