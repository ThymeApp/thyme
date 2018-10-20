// @flow

import { combineReducers } from 'redux';

function jwt(state: string | null = null, action) {
  switch (action.type) {
    case 'LOG_OUT':
      return null;
    case 'ACCOUNT_UPDATE_TOKEN':
    case 'ACCOUNT_REGISTER':
    case 'ACCOUNT_LOGIN':
      return action.token;
    default:
      return state;
  }
}

function capabilities(state: capability[] = [], action) {
  switch (action.type) {
    case 'ACCOUNT_LOGIN':
    case 'ACCOUNT_REGISTER':
      return action.capabilities || [];
    default:
      return state;
  }
}

export default combineReducers({
  jwt,
  capabilities,
});
