import { combineReducers } from 'redux';

import setting from './setting';

function byName(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_SETTING':
      return {
        ...state,
        [action.name]: setting(state[action.name], action),
        [action.value]: setting(state[action.value], action),
      };
    default:
      return state;
  }
}

function allNames(state = [], action) {
  switch (action.type) {
    case 'SET_SETTINGS':
      return {
        ...state,
        [action.name]: setting(state[action.name], action),
        [action.value]: setting(state[action.value], action),
      };
    default:
      return state;
  }
}


export default combineReducers({
  byName,
  allNames,
});
