// @flow

import { createSelector } from 'reselect';

export const getJwt = (state: StateShape) => state.account.jwt;
export const isLoaded = (state: StateShape) => state.account.isLoaded;
export const isPremium = (state: StateShape) => state.account.isPremium;

export const isLoggedIn = createSelector<StateShape, *, boolean, *>(getJwt, (jwt) => !!jwt);
export const hasPremium = createSelector<StateShape, *, *, boolean, *>(
  [isLoaded, isPremium],
  (loaded, premium) => loaded && premium,
);
