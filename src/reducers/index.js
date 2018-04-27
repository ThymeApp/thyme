// @flow

import { combineReducers } from 'redux';

import app from './app';
import time from './time';
import projects from './projects';
import reports from './reports';

export default combineReducers({
  app,
  time,
  projects,
  reports,
});
