// @flow

import { combineReducers } from 'redux';

function toggleFilter(state: Array<string | null>, filter: string | null) {
  if (state.indexOf(filter) > -1) {
    return state.filter(item => item !== filter);
  }

  return [...state, filter];
}

function filters(state: Array<string | null> = [], action) {
  switch (action.type) {
    case 'RESET_FILTERS':
      return action.filters;
    case 'TOGGLE_FILTER':
      return toggleFilter(state, action.filter);
    default:
      return state;
  }
}

export default combineReducers({
  filters,
});
