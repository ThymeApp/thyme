// @flow

export type importDataType = {
  time: Array<TimeType>,
  projects: Array<ProjectType>,
  reports: Array<ReportType>,
};

export function importJSONData(data: importDataType) {
  return {
    type: 'IMPORT_JSON_DATA',
    ...data,
  };
}

export function migrateStoreData() {
  return { type: 'MIGRATE_STORE_DATA' };
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

export function updateAvailable() {
  return { type: 'UPDATE_AVAILABLE' };
}

export function sync() {
  return { type: 'SYNC' };
}

export function syncFailed(error: Error) {
  return { type: 'SYNC_FAILED', error };
}

export function syncSuccess() {
  return { type: 'SYNC_SUCCESS' };
}

export function appInit() {
  return { type: 'APP_INIT' };
}

export function checkForUpdate() {
  return { type: 'APP_CHECK_UPDATE' };
}

export function pluginInit(name: string) {
  return {
    type: 'PLUGIN_INIT',
    name,
  };
}
