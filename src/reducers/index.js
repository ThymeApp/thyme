import { combineReducers } from 'redux';

import time from './time';
import projects from './projects';

export default combineReducers({
  time,
  projects,
});
