// @flow

export const isSyncing = (state: StateShape) => state.app.syncing;
export const getLastSync = (state: StateShape) => state.app.lastSync;
export const getAlert = (state: StateShape) => state.app.alert;
export const updateAvailable = (state: StateShape) => state.app.update;
