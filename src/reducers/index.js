// @flow

import { combineReducers } from 'redux';

import time from './time';
import projects from './projects';
import reports from './reports';

export default combineReducers({
  time,
  projects,
  reports,
});
