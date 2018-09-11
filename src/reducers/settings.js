// @flow

import { combineReducers } from 'redux';

function durationRounding(state: rounding = 'none', action) {
  switch (action.type) {
    case 'UPDATE_DURATION_ROUNDING':
      return action.rounding;
    default:
      return state;
  }
}

function durationRoundingAmount(state: number = 5, action) {
  switch (action.type) {
    case 'UPDATE_DURATION_ROUNDING_AMOUNT':
      return action.amount;
    default:
      return state;
  }
}

function roundingOn(state: roundableOn = 'entries', action) {
  switch (action.type) {
    case 'UPDATE_ROUNDING_ON':
      return action.roundingOn;
    default:
      return state;
  }
}

export default combineReducers({
  durationRounding,
  durationRoundingAmount,
  roundingOn,
});
