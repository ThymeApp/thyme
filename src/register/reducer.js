// @flow

import { combineReducers } from 'redux';
import type { Reducer } from 'redux';

import createReducers from '../reducers/index';

type Reducers = { [key: string]: Reducer<ThymeStore, *> };

const registeredReducers: { [path: string]: Reducers[] } = {};
let registeredStore: ?ThymeStore;

export function registerStore(store: ThymeStore) {
  registeredStore = store;
}

export function register(store: ThymeStore, path: string, reducers: Reducers) {
  if (!registeredReducers[path]) {
    registeredReducers[path] = [];
  }

  registeredReducers[path] = [
    ...registeredReducers[path],
    reducers,
  ];

  store.replaceReducer(createReducers());
}

export function create(path: string, reducers: Reducers) {
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
