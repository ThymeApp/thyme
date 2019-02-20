// @flow

import { ofType } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';

import { inject } from 'register/epic';
import { getState } from 'register/reducer';

export function loadOnCapability(
  importModule: () => Promise<*>,
  selector: (state: any) => boolean,
  args: any,
) {
  const onLoadPlugin = () => importModule()
    .then(module => module && typeof module.default === 'function' && module.default(args));
  const initialMatchesCapability = selector(getState());

  // if already possible, don't wait for receiving information
  if (initialMatchesCapability) {
    onLoadPlugin();
  } else {
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

        return onLoadPlugin();
      }),
      // prevent new actions
      filter(() => false),
    );

    inject(asyncEpic);
  }
}
