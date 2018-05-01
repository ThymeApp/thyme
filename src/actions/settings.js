// @flow

export function updateSetting(name: string, value: string) {
  return {
    type: 'UPDATE_SETTING',
    name,
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
