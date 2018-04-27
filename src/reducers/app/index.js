// @flow

import { combineReducers } from 'redux';

function alert(state: string = '', action) {
  switch (action.type) {
    case 'SET_ALERT':
      return action.message;
    case 'CLEAR_ALERT':
      return '';
    default:
      return state;
  }
}

export default combineReducers({
  alert,
});
