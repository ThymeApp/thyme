// @flow

import { combineReducers } from 'redux';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';

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

function from(state: Date = startOfWeek(new Date(), { weekStartsOn: 1 }), action): Date {
  switch (action.type) {
    case 'UPDATE_DATE_RANGE':
      return action.from;
    default:
      return state;
  }
}

function to(state: Date = endOfWeek(new Date(), { weekStartsOn: 1 }), action): Date {
  switch (action.type) {
    case 'UPDATE_DATE_RANGE':
      return action.to;
    default:
      return state;
  }
}

export default combineReducers({
  filters,
  from,
  to,
});
