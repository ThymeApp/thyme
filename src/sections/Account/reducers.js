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

function isPremium(state: boolean = false, action) {
  switch (action.type) {
    case 'LOG_OUT':
    case 'APP_INIT':
      return false;
    case 'ACCOUNT_RECEIVE_INFORMATION':
      return action.information.capabilities.indexOf('premium') > -1;
    default:
      return state;
  }
}

function isLoaded(state: boolean = false, action) {
  switch (action.type) {
    case 'ACCOUNT_CHECKED':
    case 'ACCOUNT_RECEIVE_INFORMATION':
      return true;
    case 'ACCOUNT_FETCH_INFORMATION':
      return false;
    default:
      return state;
  }
}

export default () => create('account', {
  jwt,
  isLoaded,
  isPremium,
});
