// @flow

export const isSyncing = (state: StateShape) => state.app.syncing;
export const getAlert = (state: StateShape) => state.app.alert;
export const updateAvailable = (state: StateShape) => state.app.update;
