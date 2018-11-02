// @flow

import { ofType } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';

import { inject } from 'register/epic';

export function loadOnCapability(
  importModule: () => Promise<*>,
  selector: (state: any) => boolean,
  args: any,
) {
  const asyncEpic = (
    action$: ActionsObservable,
    state$: StateObservable,
  ) => action$.pipe(
    ofType('ACCOUNT_RECEIVE_INFORMATION'),
    mergeMap((): any[] | Promise<*> => {
      const matchesCapability = selector(state$.value);

      if (!matchesCapability) {
        return [];
      }

      return importModule()
        .then(module => module && typeof module.default === 'function' && module.default(args));
    }),
    // prevent new actions
    filter(() => false),
  );

  inject(asyncEpic);
}
