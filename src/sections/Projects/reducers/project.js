// @flow

import { create } from 'register/reducer';

function id(state = null, action) {
  switch (action.type) {
    case 'ADD_PROJECT':
      return action.id;
    default:
      return state;
  }
}

function parent(state = null, action) {
  switch (action.type) {
    case 'ADD_PROJECT':
    case 'UPDATE_PROJECT':
      return action.parent;
    default:
      return state;
  }
}

function name(state = '', action) {
  switch (action.type) {
    case 'ADD_PROJECT':
    case 'UPDATE_PROJECT':
      return action.name;
    default:
      return state;
  }
}

function colour(state = null, action) {
  switch (action.type) {
    case 'ADD_PROJECT':
    case 'UPDATE_PROJECT':
      return action.colour || null;
    default:
      return state;
  }
}

function archived(state = false, action) {
  switch (action.type) {
    case 'ARCHIVE_PROJECT':
      return !state;
    default:
      return state;
  }
}

function removed(state = false, action) {
  switch (action.type) {
    case 'TRUNCATE_PROJECTS':
    case 'REMOVE_PROJECT':
      return true;
    default:
      return state;
  }
}

function createdAt(state = new Date(), action) {
  switch (action.type) {
    case 'ADD_PROJECT':
      return new Date();
    default:
      return state;
  }
}

function updatedAt(state = new Date(), action) {
  switch (action.type) {
    case 'ADD_PROJECT':
    case 'UPDATE_PROJECT':
      return new Date();
    default:
      return state;
  }
}

export default () => create('projects.project', {
  id,
  parent,
  name,
  colour,
  archived,
  removed,
  createdAt,
  updatedAt,
});
