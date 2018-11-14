// @flow

import { create } from 'register/reducer';

function apiRoot(state: string = process.env.REACT_APP_API_ROOT || '//localhost:4000', action) {
  switch (action.type) {
    case 'UPDATE_API_ROOT':
      return action.apiRoot;
    default:
      return state;
  }
}

export default () => create('settings.advanced', { apiRoot });
