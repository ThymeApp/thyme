// @flow

import { create } from 'register/reducer';

function id(state = null, action) {
  switch (action.type) {
    case 'ADD_TIME':
      return action.id;
    default:
      return state;
  }
}

function start(state = '00:00', action) {
  switch (action.type) {
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return action.start;
    default:
      return state;
  }
}

function end(state = '00:00', action) {
  switch (action.type) {
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return action.end;
    default:
      return state;
  }
}

function project(state = null, action) {
  switch (action.type) {
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return action.project;
    case 'REMOVE_PROJECT':
      return state === action.id ? null : state;
    case 'TRUNCATE_PROJECTS':
      return null;
    default:
      return state;
  }
}

function notes(state = '', action) {
  switch (action.type) {
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return action.notes || '';
    default:
      return state;
  }
}

function removed(state = false, action) {
  switch (action.type) {
    case 'TRUNCATE_TIME':
    case 'REMOVE_TIME':
      return true;
    default:
      return state;
  }
}

function createdAt(state = new Date(), action) {
  switch (action.type) {
    case 'ADD_TIME':
      return new Date();
    default:
      return state;
  }
}

function updatedAt(state = new Date(), action) {
  switch (action.type) {
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return new Date();
    default:
      return state;
  }
}

export default () => create('timesheet.time', {
  id,
  project,
  start,
  end,
  notes,
  removed,
  createdAt,
  updatedAt,
});
