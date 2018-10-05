// @flow

export function updateDurationRounding(round: rounding) {
  return {
    type: 'UPDATE_DURATION_ROUNDING',
    rounding: round,
  };
}

export function updateDurationRoundingAmount(amount: number) {
  return {
    type: 'UPDATE_DURATION_ROUNDING_AMOUNT',
    amount,
  };
}

export function updateRoundingOn(roundingOn: roundableOn) {
  return {
    type: 'UPDATE_ROUNDING_ON',
    roundingOn,
  };
}
