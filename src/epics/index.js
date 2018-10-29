// @flow

import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

import accountEpics from 'sections/Account/epics';

const epics = combineEpics(
  ...accountEpics,
);

const epic$ = new BehaviorSubject(epics);
const rootEpic = (action$: ActionsObservable, state$: StateObservable) => epic$.pipe(
  mergeMap(epic => epic(action$, state$)),
);

export function injectAsyncEpic(
  asyncEpic: (action$: ActionsObservable, state$: StateObservable) => any,
) {
  epic$.next(asyncEpic);
}

export default rootEpic;
