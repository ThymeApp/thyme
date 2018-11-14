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

export function register(path: string, reducers: Reducers, store: ?ThymeStore) {
  if (!registeredReducers[path]) {
    registeredReducers[path] = [];
  }

  registeredReducers[path] = [
    ...registeredReducers[path],
    reducers,
  ];

  if (!store && !registeredStore) {
    throw new Error('No store registered, please provide a store or register one first.');
  }

  // default to provided store, or fallback to registered store
  const storeToUse = store || registeredStore;

  if (storeToUse) {
    storeToUse.replaceReducer(createReducers());
  }
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
