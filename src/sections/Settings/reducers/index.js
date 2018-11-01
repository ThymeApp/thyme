// @flow

import { createExtendableReducer } from 'reducers/registerReducer';

import createRoundingReducer from './rounding';
import createTimesheetReducer from './timesheet';

export default () => createExtendableReducer('settings', {
  rounding: createRoundingReducer(),
  timesheet: createTimesheetReducer(),
});
