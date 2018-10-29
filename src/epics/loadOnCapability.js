// @flow

import { ofType } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';

export default (importModule: Promise<*>, selector: (state: any) => boolean) => (
  action$: ActionsObservable,
  state$: StateObservable,
) => action$.pipe(
  ofType('ACCOUNT_RECEIVE_INFORMATION'),
  mergeMap((): any[] | Promise<*> => {
    const matchesCapability = selector(state$.value);

    if (!matchesCapability) {
      return [];
    }

    return importModule;
  }),
  // prevent new actions
  filter(() => false),
);
