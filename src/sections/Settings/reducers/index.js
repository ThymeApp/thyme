// @flow

import { combineReducers } from 'redux';

import rounding from './rounding';
import timesheet from './timesheet';

export default combineReducers({
  rounding,
  timesheet,
});
