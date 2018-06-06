// @flow

import { combineReducers } from 'redux';

function jwt(state: string | null = null, action) {
  switch (action.type) {
    case 'LOG_OUT':
      return null;
    case 'ACCOUNT_REGISTER':
      return action.token;
    default:
      return state;
  }
}

export default combineReducers({
  jwt,
});
