// @flow

import { create } from 'register/reducer';

function durationRounding(state: Rounding = 'none', action) {
  switch (action.type) {
    case 'UPDATE_DURATION_ROUNDING':
      return action.rounding;
    default:
      return state;
  }
}

function durationRoundingAmount(state: number = 15, action) {
  switch (action.type) {
    case 'UPDATE_DURATION_ROUNDING_AMOUNT':
      return action.amount;
    default:
      return state;
  }
}

function roundingOn(state: RoundableOn = 'entries', action) {
  switch (action.type) {
    case 'UPDATE_ROUNDING_ON':
      return action.roundingOn;
    default:
      return state;
  }
}

export default () => create('settings.rounding', {
  durationRounding,
  durationRoundingAmount,
  roundingOn,
});
