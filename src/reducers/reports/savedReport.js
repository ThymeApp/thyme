// @flow

import { combineReducers } from 'redux';

function id(state = null, action) {
  switch (action.type) {
    case 'ADD_REPORT':
      return action.id;
    default:
      return state;
  }
}

function name(state: string = '', action) {
  switch (action.type) {
    case 'ADD_REPORT':
      return action.name;
    default:
      return state;
  }
}

function filters(state: Array<string | null> = [], action) {
  switch (action.type) {
    case 'ADD_REPORT':
      return action.filters;
    default:
      return state;
  }
}

function from(state: Date = new Date(), action): Date {
  switch (action.type) {
    case 'ADD_REPORT':
      return action.from;
    default:
      return state;
  }
}

function to(state: Date = new Date(), action): Date {
  switch (action.type) {
    case 'ADD_REPORT':
      return action.to;
    default:
      return state;
  }
}

export default combineReducers({
  id,
  name,
  filters,
  from,
  to,
});
