// @flow

import { combineReducers } from 'redux';
import pick from 'lodash/pick';

import time from './time';

function byId(state = {}, action) {
  switch (action.type) {
    // targeted updates
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return {
        ...state,
        [action.id]: time(state[action.id], action),
      };
    // update every item
    case 'REMOVE_PROJECT':
      return Object.keys(state).reduce((newState, key) => ({
        ...newState,
        [key]: time(state[key], action),
      }), {});
    // remove item
    case 'REMOVE_TIME':
      return pick(state, Object.keys(state).filter(item => item !== action.id));
    default:
      return state;
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case 'ADD_TIME':
      return [...state, action.id];
    case 'REMOVE_TIME':
      return state.filter(id => id !== action.id);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds,
});
