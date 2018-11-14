// @flow

import { create } from 'register/reducer';

import createRoundingReducer from './rounding';
import createTimesheetReducer from './timesheet';
import createAdvancedReducer from './advanced';

export default () => create('settings', {
  rounding: createRoundingReducer(),
  timesheet: createTimesheetReducer(),
  advanced: createAdvancedReducer(),
});
