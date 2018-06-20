// @flow

import { combineReducers } from 'redux';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';

import report from './report';

function byId(state = {}, action) {
  switch (action.type) {
    // targeted updates
    case 'ADD_REPORT':
    case 'REMOVE_REPORT':
      return {
        ...state,
        [action.id]: report(state[action.id], action),
      };
    case 'IMPORT_JSON_DATA':
      return action.reports.reduce((newState, item) => ({
        ...newState,
        [item.id]: item,
      }), {});
    default:
      return state;
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case 'ADD_REPORT':
      return [...state, action.id];
    case 'IMPORT_JSON_DATA':
      return action.reports.map(item => item.id);
    default:
      return state;
  }
}

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
  byId,
  allIds,
  filters,
  from,
  to,
});
