// @flow

import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

import accountEpics from 'sections/Account/epics';

import pluginEpics from './plugins';
import updateEpics from './update';

const epics = combineEpics(
  ...accountEpics,
  ...pluginEpics,
  ...updateEpics,
);

export const epic$ = new BehaviorSubject(epics);
const rootEpic = (action$: ActionsObservable, state$: StateObservable) => epic$.pipe(
  mergeMap(epic => epic(action$, state$)),
);

export default rootEpic;
