// @flow

import { combineReducers } from 'redux';

function filters(state: Array<string> = [], action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  filters,
});
