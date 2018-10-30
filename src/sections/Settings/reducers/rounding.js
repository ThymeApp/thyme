// @flow

import { createExtendableReducer } from 'reducers/registerReducer';

function durationRounding(state: rounding = 'none', action) {
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

function roundingOn(state: roundableOn = 'entries', action) {
  switch (action.type) {
    case 'UPDATE_ROUNDING_ON':
      return action.roundingOn;
    default:
      return state;
  }
}

export default () => createExtendableReducer('settings.rounding', {
  durationRounding,
  durationRoundingAmount,
  roundingOn,
});
