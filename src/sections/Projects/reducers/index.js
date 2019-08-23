// @flow

import { create } from 'register/reducer';

import createProjectReducer from './project';

const byId = (project) => (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
    case 'UPDATE_PROJECT':
    case 'ARCHIVE_PROJECT':
    case 'REMOVE_PROJECT':
      return {
        ...state,
        [action.id]: project(state[action.id], action),
      };
    case 'TRUNCATE_PROJECTS':
      return Object.keys(state).reduce((acc, key) => ({
        ...acc,
        [key]: project(state[key], action),
      }), {});
    case 'IMPORT_JSON_DATA':
      return action.projects.reduce((newState, item) => ({
        ...newState,
        [item.id]: item,
      }), {});
    default:
      return state;
  }
};

function allIds(state = [], action) {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state, action.id];
    case 'IMPORT_JSON_DATA':
      return action.projects.map((item) => item.id);
    default:
      return state;
  }
}

export default () => create('projects', {
  byId: byId(createProjectReducer()),
  allIds,
});
