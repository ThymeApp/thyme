// @flow

import { combineReducers } from 'redux';
import pick from 'lodash/pick';

import project from './project';

function byId(state = {}, action) {
  switch (action.type) {
    case 'ADD_PROJECT':
    case 'UPDATE_PROJECT':
      return {
        ...state,
        [action.id]: project(state[action.id], action),
      };
    case 'REMOVE_PROJECT':
      return pick(state, Object.keys(state).filter(item => item !== action.id));
    case 'TRUNCATE_PROJECTS':
      return {};
    case 'IMPORT_JSON_DATA':
      return action.projects.reduce((newState, item) => ({
        ...newState,
        [item.id]: item,
      }), {});
    default:
      return state;
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state, action.id];
    case 'REMOVE_PROJECT':
      return state.filter(id => id !== action.id);
    case 'TRUNCATE_PROJECTS':
      return [];
    case 'IMPORT_JSON_DATA':
      return action.projects.map(item => item.id);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds,
});
