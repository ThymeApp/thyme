import { combineReducers } from 'redux';

function id(state = null, action) {
  switch(action.type) {
    case 'ADD_TIME':
      return action.id;
    default:
      return state;
  }
}

function date(state = new Date(), action) {
  switch(action.type) {
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return action.date;
    default:
      return state;
  }
}

function start(state = '00:00', action) {
  switch(action.type) {
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return action.start;
    default:
      return state;
  }
}

function end(state = '00:00', action) {
  switch(action.type) {
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return action.end;
    default:
      return state;
  }
}

function project(state = null, action) {
  switch(action.type) {
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return action.project;
    default:
      return state;
  }
}

function notes(state = '', action) {
  switch(action.type) {
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return action.notes;
    default:
      return state;
  }
}

const time = combineReducers({
  id,
  project,
  date,
  start,
  end,
  notes,
});

export default time;