// @flow

import { combineReducers } from 'redux';

import time from './time';

function byId(state = {}, action) {
  switch (action.type) {
    // targeted updates
    case 'ADD_TIME':
    case 'UPDATE_TIME':
    case 'REMOVE_TIME':
      return {
        ...state,
        [action.id]: time(state[action.id], action),
      };
    // update every item
    case 'REMOVE_PROJECT':
    case 'TRUNCATE_PROJECTS':
      return Object.keys(state).reduce((newState, key) => ({
        ...newState,
        [key]: time(state[key], action),
      }), {});
    case 'TRUNCATE_TIME':
      return Object.keys(state).reduce((acc, key) => ({
        ...acc,
        [key]: time(state[key], action),
      }), {});
    case 'IMPORT_JSON_DATA':
      return action.time.reduce((newState, item) => ({
        ...newState,
        [item.id]: item,
      }), {});
    default:
      return state;
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case 'ADD_TIME':
      return [...state, action.id];
    case 'IMPORT_JSON_DATA':
      return action.time.map(item => item.id);
    default:
      return state;
  }
}

function dateRange(state = 'today', action): dateRanges {
  switch (action.type) {
    case 'CHANGE_DATE_RANGE':
      return action.dateRange;
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds,
  dateRange,
});
