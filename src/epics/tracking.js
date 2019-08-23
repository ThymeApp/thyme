// @flow

import { ofType } from 'redux-observable';
import { tap, ignoreElements } from 'rxjs/operators';

import { trackEvent } from 'core/analytics';

export const createTracking = (
  actionType: string,
  onTrack: (action: any) => { category: string, action: string, name?: string, value?: string },
) => (action$: ActionsObservable) => action$.pipe(
  ofType(actionType),
  tap((action) => {
    const result = onTrack(action);

    if (result && result.category && result.action) {
      trackEvent(result.category, result.action, result.name, result.value);
    }
  }),
  ignoreElements(),
);

export default [
  createTracking('APP_INIT', () => ({
    category: 'App',
    action: 'init',
    name: 'version',
    value: process.env.REACT_APP_VERSION || '',
  })),
  createTracking('IMPORT_JSON_DATA', () => ({ category: 'App', action: 'import' })),

  createTracking('ACCOUNT_LOGIN', () => ({ category: 'Account', action: 'login' })),
  createTracking('ACCOUNT_REGISTER', () => ({ category: 'Account', action: 'register' })),
  createTracking('LOGOUT', () => ({ category: 'Account', action: 'logout' })),

  createTracking('ADD_PROJECT', () => ({ category: 'Projects', action: 'add' })),
  createTracking('UPDATE_PROJECT', () => ({ category: 'Projects', action: 'update' })),
  createTracking('ARCHIVE_PROJECT', () => ({ category: 'Projects', action: 'archive' })),
  createTracking('REMOVE_PROJECT', () => ({ category: 'Projects', action: 'remove' })),

  createTracking('ADD_REPORT', () => ({ category: 'Reports', action: 'add' })),
  createTracking('REMOVE_REPORT', () => ({ category: 'Reports', action: 'remove' })),

  createTracking('ADD_TIME', () => ({ category: 'TimeSheet', action: 'add' })),
  createTracking('UPDATE_TIME', () => ({ category: 'TimeSheet', action: 'update' })),
  createTracking('REMOVE_TIME', () => ({ category: 'TimeSheet', action: 'remove' })),
  createTracking('CHANGE_DATE_RANGE', (action) => ({
    category: 'TimeSheet',
    action: 'change date range',
    name: 'dateRange',
    value: action.dateRange,
  })),
];
