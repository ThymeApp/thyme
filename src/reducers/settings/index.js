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
    case 'ADD_SETTING':
    default:
      return state;
  }
}


export default combineReducers({
  byName,
});
