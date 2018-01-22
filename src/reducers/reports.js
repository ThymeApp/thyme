// @flow

import { combineReducers } from 'redux';

function filters(state: Array<string> = [], action) {
  switch (action.type) {
    case 'RESET_FILTERS':
      return action.filters;
    default:
      return state;
  }
}

export default combineReducers({
  filters,
});
