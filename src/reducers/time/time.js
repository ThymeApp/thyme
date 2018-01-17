import { combineReducers } from 'redux';
import startOfDay from 'date-fns/start_of_day';

function id(state = null, action) {
  switch(action.type) {
    case 'ADD_TIME':
      return action.id;
    default:
      return state;
  }
}

function date(state = startOfDay(new Date()), action) {
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

function createdAt(state = new Date(), action) {
  switch(action.type) {
    case 'ADD_TIME':
      return new Date();
    default:
      return state;
  }
}

function updatedAt(state = new Date(), action) {
  switch(action.type) {
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return new Date();
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
  createdAt,
  updatedAt,
});

export default time;
