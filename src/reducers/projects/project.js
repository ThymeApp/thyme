import { combineReducers } from 'redux';

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

const project = combineReducers({
  id,
  parent,
  name,
  createdAt,
  updatedAt,
});

export default project;
