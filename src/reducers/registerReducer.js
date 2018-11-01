// @flow

import { combineReducers } from 'redux';
import type { Reducer } from 'redux';

import createReducers from '.';

type Reducers = { [key: string]: Reducer<ThymeStore, *> };

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
    ...extraReducers.reduce((accReducers, reducer) => ({
      ...accReducers,
      ...reducer,
    }), {}),
  };

  return combineReducers(newReducers);
}
