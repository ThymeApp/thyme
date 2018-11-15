// @flow

export function updateDurationRounding(rounding: Rounding) {
  return {
    type: 'UPDATE_DURATION_ROUNDING',
    rounding,
  };
}

export function updateDurationRoundingAmount(amount: number) {
  return {
    type: 'UPDATE_DURATION_ROUNDING_AMOUNT',
    amount,
  };
}

export function updateRoundingOn(roundingOn: RoundableOn) {
  return {
    type: 'UPDATE_ROUNDING_ON',
    roundingOn,
  };
}

export function updatePerPage(perPage: number | string) {
  return {
    type: 'UPDATE_PER_PAGE',
    perPage,
  };
}

export function updateApiRoot(apiRoot: ?string) {
  return {
    type: 'UPDATE_API_ROOT',
    apiRoot,
  };
}

export const enableNotes = () => ({ type: 'ENABLE_NOTES' });
export const disableNotes = () => ({ type: 'DISABLE_NOTES' });
export const enableProjects = () => ({ type: 'ENABLE_PROJECTS' });
export const disableProjects = () => ({ type: 'DISABLE_PROJECTS' });
export const enableEndDate = () => ({ type: 'ENABLE_END_DATE' });
export const disableEndDate = () => ({ type: 'DISABLE_END_DATE' });
