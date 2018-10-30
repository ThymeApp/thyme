// @flow

import { combineReducers } from 'redux';

import createReducers from '.';

type Reducers = { [key: string]: (state: any, action: any) => any };

const registeredReducers: { [path: string]: Reducers[] } = {};

export function registerReducer(store: ThymeStore, path: string, reducers: Reducers) {
  if (!registeredReducers[path]) {
    registeredReducers[path] = [];
  }

  registeredReducers[path] = [
    ...registeredReducers[path],
    reducers,
  ];

  store.replaceReducer(createReducers());
}

export function createExtendableReducer(
  path: string,
  reducers: Reducers,
) {
  const extraReducers = registeredReducers[path] || [];

  const newReducers = {
    ...reducers,
    ...extraReducers.reduce((accReducers, r) => ({
      ...accReducers,
      ...r,
    }), {}),
  };

  return combineReducers(newReducers);
}
