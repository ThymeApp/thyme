// @flow

export function importJSONData(data: { time: Array<timeType>, projects: Array<projectType> }) {
  return {
    type: 'IMPORT_JSON_DATA',
    ...data,
  };
}
