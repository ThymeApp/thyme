// @flow

export function setRounding(value: string) {
  return {
    type: 'ROUNDING',
    value,
  };
}
export function setRoundingDown(value: string) {
  return {
    type: 'ROUNDING_DOWN',
    value,
  };
}
