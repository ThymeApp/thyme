// @flow

import { create } from 'register/reducer';

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
    case 'LOG_OUT':
      return [];
    case 'ACCOUNT_RECEIVE_INFORMATION':
      return action.information.capabilities || [];
    default:
      return state;
  }
}

export default () => create('account', {
  jwt,
  capabilities,
});
