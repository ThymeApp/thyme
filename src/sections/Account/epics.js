// @flow

import { ActionsObservable, ofType } from 'redux-observable';
import {
  filter,
  mergeMap,
  map,
  tap,
  ignoreElements,
} from 'rxjs/operators';
import isEqual from 'lodash/isEqual';

import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';

import parseJwt from 'core/jwt';
import { mergeImport, stateToExport } from 'core/importExport';
import { saveState } from 'core/localStorage';
import { userLogin } from 'core/extensions/events';

import { importJSONData } from 'actions/app';

import { getDataToExport } from 'selectors/importExport';

import { getState, refreshToken, getAccountInformation } from './api';

import {
  logout,
  updateToken,
  accountInit,
  receiveAccountInformation,
  accountChecked,
  getAccountInformation as fetchAccountFromAPI,
} from './actions';

import { getJwt, hasPremium } from './selectors';

export const checkTokenEpic = (action$: ActionsObservable, state$: StateObservable) => action$.pipe(
  ofType('APP_INIT'),
  mergeMap((): any[] | Promise<*> => {
    const jwt = getJwt(state$.value);

    if (!jwt) {
      return [accountChecked()];
    }

    const parsedJwt = parseJwt(jwt);
    const isOk = parsedJwt.exp && isBefore(new Date(), addDays(parsedJwt.exp * 1000, -7));

    // token is still okay to use
    if (isOk) {
      return [accountInit()];
    }

    return refreshToken()
      // save refreshed token
      .then((token) => updateToken(token))
      // token is invalid
      .catch(logout);
  }),
);

export const fetchStateEpic = (action$: ActionsObservable, state$: StateObservable) => action$.pipe(
  ofType('ACCOUNT_RECEIVE_INFORMATION'),
  mergeMap(() => {
    userLogin();

    if (!hasPremium(state$.value)) {
      return Promise.resolve(false);
    }

    return getState()
      .then((fromServer) => {
        const exportState = getDataToExport(state$.value);

        const currentState = stateToExport(exportState);

        // check if the local state is up to date
        if (isEqual(currentState, fromServer)) {
          return false;
        }

        // merge server state with current state
        const newState = mergeImport(currentState, fromServer);

        // save merged state to store
        return importJSONData(newState);
      });
  }),
  filter((needsAction) => !!needsAction),
);

export const createFetchAccountInformation = (action$: ActionsObservable) => action$.pipe(
  ofType(
    'ACCOUNT_INIT',
    'ACCOUNT_UPDATE_TOKEN',
    'ACCOUNT_LOGIN',
    'ACCOUNT_UPDATE_INFORMATION',
    'ACCOUNT_REGISTER',
  ),
  map(() => fetchAccountFromAPI()),
);

export const fetchAccountInformation = (action$: ActionsObservable) => action$.pipe(
  ofType('ACCOUNT_FETCH_INFORMATION'),
  mergeMap(() => getAccountInformation().catch(() => false)),
  map((information) => (information ? receiveAccountInformation(information) : logout())),
);

export const refreshOnLogOut = (
  action$: ActionsObservable,
  state$: StateObservable,
) => action$.pipe(
  ofType('LOG_OUT'),
  tap(() => {
    // save state to localStorage
    saveState(state$.value);
    window.location.reload(false);
  }),
  ignoreElements(),
);

export default [
  checkTokenEpic,
  fetchStateEpic,
  createFetchAccountInformation,
  fetchAccountInformation,
  refreshOnLogOut,
];
