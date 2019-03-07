// @flow

import { ofType } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';

import { inject } from 'register/epic';
import { getState } from 'register/reducer';

import { hasPremium } from 'sections/Account/selectors';

export function loadOnPremium(
  importModule: () => Promise<*>,
  args: any,
) {
  const onLoadPlugin = () => importModule()
    .then(module => module && typeof module.default === 'function' && module.default(args));
  const state = getState();
  const initialMatchesCapability = state ? hasPremium(state) : false;

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
        if (!hasPremium(state$.value)) {
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
