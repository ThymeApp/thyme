// @flow

import { create } from 'register/reducer';

import createRoundingReducer from './rounding';
import createTimesheetReducer from './timesheet';

export default () => create('settings', {
  rounding: createRoundingReducer(),
  timesheet: createTimesheetReducer(),
});
