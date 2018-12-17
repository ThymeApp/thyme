// @flow

import { ofType } from 'redux-observable';
import { mergeMap, filter } from 'rxjs/operators';

import getAppVersion from 'api/app';

import isNewerVersion from 'core/compareVersions';

import { updateAvailable } from 'actions/app';

export const announcePlugin = (action$: ActionsObservable) => action$.pipe(
  ofType('APP_INIT'),
  mergeMap(() => getAppVersion()
    .then((version) => {
      if (isNewerVersion(version, process.env.REACT_APP_VERSION || '')) {
        return updateAvailable();
      }

      return false;
    })),
  filter(needsAction => !!needsAction),
);

export default [announcePlugin];
