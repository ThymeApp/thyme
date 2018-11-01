// @flow

import { createSelector } from 'reselect';

export const isLoggedIn = (state: storeShape) => !!state.account.jwt;
export const getJwt = (state: storeShape) => state.account.jwt;
export const getCapabilities = (state: storeShape) => state.account.capabilities;

export const hasCapability = (
  ability: capability,
): (
  state: storeShape,
) => boolean => createSelector(
  getCapabilities,
  (capabilities: capability[]) => capabilities.indexOf(ability) > -1,
);
