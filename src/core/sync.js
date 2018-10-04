// @flow

import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import type { Dispatch } from 'redux';

import { post } from './fetch';
import { stateToExport } from './importExport';
import type { exportType } from './importExport';

import { isLoggedIn } from '../selectors/account';

import { sync, syncFailed, syncSuccess } from '../actions/app';

let prevState: exportType = { time: [], projects: [], reports: [] };

function syncWithApi(state: storeShape, dispatch: Dispatch<*>) {
  if (!isLoggedIn(state)) {
    return;
  }

  const newState = stateToExport(state);

  if (isEqual(prevState, newState)) {
    return;
  }

  dispatch(sync());

  post('/save-state', newState)
    .then(() => {
      prevState = newState;
      dispatch(syncSuccess());
    })
    .catch((e) => {
      dispatch(syncFailed(e));
    });
}

export default function syncOnUpdate(store: ThymeStore) {
  // save changes from store to localStorage
  store.subscribe(debounce(() => {
    syncWithApi(store.getState(), store.dispatch);
  }, 2000));
}
