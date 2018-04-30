// @flow

export function updateSetting(name: string, value: string) {
  return {
    type: 'UPDATE_SETTING',
    name,
    value,
  };
}

export function setSettings(settings: array) {
  return {
    type: 'SET_SETTINGS',
    settings,
  };
}
