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
