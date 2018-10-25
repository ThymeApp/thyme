// @flow

import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducers from './reducers';
import epics from './epics';

const epicMiddleware = createEpicMiddleware();

export default (initialState: any = {}) => {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        epicMiddleware,
      ),
    ),
  );

  epicMiddleware.run(epics);

  return store;
};
