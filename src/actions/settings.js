// @flow

export function setRounding(value: string) {
  return {
    type: 'SET_ROUNDING',
    value,
  };
}

export function addSetting(name: string, value: string) {
  return {
    type: 'ADD_SETTING',
    name,
    value,
  };
}
