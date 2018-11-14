// @flow

import { create } from 'register/reducer';

const defaultApiRoot = process.env.REACT_APP_API_ROOT || '//localhost:4000';

function apiRoot(state: string = defaultApiRoot, action) {
  switch (action.type) {
    case 'UPDATE_API_ROOT':
      return action.apiRoot || defaultApiRoot;
    default:
      return state;
  }
}

export default () => create('settings.advanced', { apiRoot });
