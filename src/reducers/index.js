// @flow

import { create } from 'register/reducer';

import createReportsReducers from 'sections/Reports/reducers';
import createSettingsReducers from 'sections/Settings/reducers';
import createProjectsReducers from 'sections/Projects/reducers';
import createAccountReducers from 'sections/Account/reducers';
import createTimeReducers from 'sections/TimeSheet/reducers';

import runMigrations from '../migrations';

import createAppReducers from './app';

export default () => {
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
