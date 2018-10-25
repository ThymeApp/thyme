import { ofType, combineEpics } from 'redux-observable';

import { mapTo } from 'rxjs/operators';

export const pingEpic = action$ => action$.pipe(
  ofType('PING'),
  mapTo({ type: 'PONG' }),
);

export default combineEpics(
  pingEpic,
);
