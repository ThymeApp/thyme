// @flow

import { ofType } from 'redux-observable';
import { tap, ignoreElements } from 'rxjs/operators';

export const announcePlugin = (action$: ActionsObservable) => action$.pipe(
  ofType('PLUGIN_INIT'),
  tap((action) => {
    // eslint-disable-next-line no-console
    console.info(`Loaded plugin: ${action.name}`);
  }),
  ignoreElements(),
);

export default [announcePlugin];
