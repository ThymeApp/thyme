// @flow

import { epic$ } from 'epics';

export function inject(
  asyncEpic: (action$: ActionsObservable, state$: StateObservable) => any,
) {
  epic$.next(asyncEpic);
}
