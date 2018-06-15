// @flow

export const isSyncing = (state: storeShape) => state.app.syncing;
export const getAlert = (state: storeShape) => state.app.alert;
export const updateAvailable = (state: storeShape) => state.app.update;
