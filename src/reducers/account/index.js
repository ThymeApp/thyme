// @flow

import { combineReducers } from 'redux';

function jwt(state: string | null = null, action) {
  switch (action.type) {
    case 'ACCOUNT_REGISTER':
      return action.token;
    default:
      return state;
  }
}

export default combineReducers({
  jwt,
});
