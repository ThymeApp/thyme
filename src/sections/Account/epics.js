// @flow

import { ofType } from 'redux-observable';
import { filter, mergeMap, map } from 'rxjs/operators';
import isEqual from 'lodash/isEqual';

import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';

import parseJwt from 'core/jwt';
import { mergeImport, stateToExport } from 'core/importExport';

import { importJSONData } from 'actions/app';

import { getDataToExport } from 'selectors/importExport';

import { getState, refreshToken, getAccountInformation } from './api';

import {
  logout,
  updateToken,
  accountInit,
  receiveAccountInformation,
} from './actions';

import { getJwt } from './selectors';

export const checkTokenEpic = (action$: ActionsObservable, state$: StateObservable) => action$.pipe(
  ofType('APP_INIT'),
  mergeMap((): any[] | Promise<*> => {
    const jwt = getJwt(state$.value);

    if (!jwt) {
      return [];
    }

    const parsedJwt = parseJwt(jwt);
    const isOk = parsedJwt.exp && isBefore(new Date(), addDays(parsedJwt.exp * 1000, -7));

    // token is still okay to use
    if (isOk) {
      return [accountInit()];
    }

    return refreshToken()
      // save refreshed token
      .then(token => updateToken(token))
      // token is invalid
      .catch(logout);
  }),
);

export const fetchStateEpic = (action$: ActionsObservable, state$: StateObservable) => action$.pipe(
  ofType('ACCOUNT_INIT', 'ACCOUNT_UPDATE_TOKEN'),
  mergeMap(() => getState()
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
    })),
  filter(needsAction => !!needsAction),
);

export const fetchAccountInformation = (action$: ActionsObservable) => action$.pipe(
  ofType('ACCOUNT_INIT', 'ACCOUNT_UPDATE_TOKEN'),
  mergeMap(() => getAccountInformation()),
  map(information => receiveAccountInformation(information)),
);

export default [
  checkTokenEpic,
  fetchStateEpic,
  fetchAccountInformation,
];
