// @flow

import { combineEpics } from 'redux-observable';

import accountEpics from 'sections/Account/epics';

export default combineEpics(
  accountEpics,
);
