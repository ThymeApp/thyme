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

export function updatePerPage(perPage: number) {
  return {
    type: 'UPDATE_PER_PAGE',
    perPage,
  };
}

export const enableNotes = () => ({ type: 'ENABLE_NOTES' });
export const disableNotes = () => ({ type: 'DISABLE_NOTES' });
export const enableProjects = () => ({ type: 'ENABLE_PROJECTS' });
export const disableProjects = () => ({ type: 'DISABLE_PROJECTS' });
export const enableEndDate = () => ({ type: 'ENABLE_END_DATE' });
export const disableEndDate = () => ({ type: 'DISABLE_END_DATE' });
