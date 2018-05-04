// @flow

import { combineReducers } from 'redux';

function rounding(state = {}, action) {
  switch (action.type) {
    case 'SET_ROUNDING':
      return action.value;
    default:
      return state;
  }
}

export default combineReducers({
  rounding,
});
