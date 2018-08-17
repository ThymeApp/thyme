// @flow

import { createStore } from 'redux';

import reducers from './reducers/index';

export default (initialState: any = {}, middleWare: any) => createStore(
  reducers,
  initialState,
  middleWare,
);
