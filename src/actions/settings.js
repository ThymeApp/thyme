// @flow

export function setStartTimeRounding(rounding: number, roundingDirection: string) {
  return {
    type: 'START_TIME',
    rounding,
    roundingDirection,
  };
}
export function setEndTimeRounding(rounding: number, roundingDirection: string) {
  return {
    type: 'END_TIME',
    rounding,
    roundingDirection,
  };
}
