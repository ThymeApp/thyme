// @flow

type importDataType = {
  time: Array<timeType>,
  projects: Array<projectType>,
  reports: Array<reportType>,
};

export function importJSONData(data: importDataType) {
  return {
    type: 'IMPORT_JSON_DATA',
    ...data,
  };
}

export function alert(message: string) {
  return {
    type: 'SET_ALERT',
    message,
  };
}

export function clearAlert() {
  return { type: 'CLEAR_ALERT' };
}
