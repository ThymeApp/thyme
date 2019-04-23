// @flow

import { create, registerCreateReducers } from 'register/reducer';

import createReportsReducers from 'sections/Reports/reducers';
import createSettingsReducers from 'sections/Settings/reducers';
import createProjectsReducers from 'sections/Projects/reducers';
import createAccountReducers from 'sections/Account/reducers';
import createTimeReducers from 'sections/TimeSheet/reducers';

import runMigrations from '../migrations';

import createAppReducers from './app';

const createReducers = () => {
  const combinedReducers = create('thyme', {
    account: createAccountReducers(),
    app: createAppReducers(),
    projects: createProjectsReducers(),
    reports: createReportsReducers(),
    time: createTimeReducers(),
    settings: createSettingsReducers(),
  });

  return (state: any, action: { type: string }) => {
    // allow to run migrations on store data by action
    if (action.type === 'MIGRATE_STORE_DATA') {
      return runMigrations(state);
    }

    return combinedReducers(state, action);
  };
};

registerCreateReducers(createReducers);

export default createReducers;
