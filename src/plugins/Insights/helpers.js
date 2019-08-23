// @flow

export function hoursAndDivisions(longestDay: number): number[] {
  const roundedLongestDay = Math.ceil(longestDay);

  if (roundedLongestDay < 1) {
    throw new Error('Calculation not possible');
  }

  if (roundedLongestDay === 1) {
    return [1, 1];
  }

  const hours = [2, 3, 4].some((n) => roundedLongestDay % n === 0)
    ? roundedLongestDay
    : roundedLongestDay + 1;
  const dividers = [4, 3, 2].find((n) => hours % n === 0) || 1;

  return [hours, dividers];
}
