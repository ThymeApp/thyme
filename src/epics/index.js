// @flow

import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

import accountEpics from 'sections/Account/epics';

import pluginEpics from './plugins';
import updateEpics from './update';
import trackingEpics from './tracking';

const epics = combineEpics(
  ...accountEpics,
  ...pluginEpics,
  ...updateEpics,
  ...trackingEpics,
);

export const epic$ = new BehaviorSubject<any>(epics);
const rootEpic = (action$: ActionsObservable, state$: StateObservable) => epic$.pipe<any>(
  mergeMap((epic) => epic(action$, state$)),
);

export default rootEpic;
