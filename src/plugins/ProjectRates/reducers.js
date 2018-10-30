// @flow

import { combineReducers } from 'redux';

import { registerReducer } from 'reducers/registerReducer';

function rate(state = 0, action) {
  switch (action.type) {
    case 'UPDATE_PROJECT':
      return action.rate;
    default:
      return state;
  }
}

export default () => registerReducer('projects.project', combineReducers({ rate }));
