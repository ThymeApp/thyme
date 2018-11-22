// @flow

import { epic$ } from 'epics';
import { invoke } from 'thyme-connect';

export function inject(
  asyncEpic: (action$: ActionsObservable, state$: StateObservable) => any,
) {
  epic$.next(asyncEpic);
}

// register method on thyme-connect
invoke('injectEpic', inject);
