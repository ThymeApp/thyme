// @flow

import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import { sync, syncFailed, syncSuccess } from 'actions/app';

import { isLoggedIn } from 'sections/Account/selectors';

import { post } from './fetch';
import { stateToExport } from './importExport';
import type { exportType } from './importExport';

let prevState: exportType = { time: [], projects: [], reports: [] };

function syncWithApi(state: StateShape, dispatch: ThymeDispatch) {
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
