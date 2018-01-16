import { combineReducers } from 'redux';

import time from './time';

function byId(state = {}, action) {
  switch(action.type) {
    case 'ADD_TIME':
    case 'UPDATE_TIME':
      return {
          ...state,
          [action.id]: time(state[action.id], action),
      };
    default:
      return state;
  }
}

function allIds(state = [], action) {
  switch(action.type) {
    case 'ADD_TIME':
      return [...state, action.id];
    case 'REMOVE_TIME':
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  allIds,
});