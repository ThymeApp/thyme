// @flow

import { combineReducers } from 'redux';

import setting from './setting';

function alert(state = {}, action) {
  switch (action.type) {
    case 'SET_ALERT':
      return action.message;
    case 'CLEAR_ALERT':
      return '';
    case 'SET_SETTING_ALERT':
      return action.message;
    default:
      return state;
  }
}

export default combineReducers({
  alert,
});
