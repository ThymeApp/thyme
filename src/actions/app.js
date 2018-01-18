// @flow

export function importJSONData(data) {
  return {
    type: 'IMPORT_JSON_DATA',
    ...data,
  };
}
