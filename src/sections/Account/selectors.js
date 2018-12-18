// @flow

import { createSelector } from 'reselect';

export const getJwt = (state: StateShape) => state.account.jwt;
export const getCapabilities = (state: StateShape) => state.account.capabilities;
export const isLoaded = (state: StateShape) => state.account.isLoaded;

export const isLoggedIn = createSelector<StateShape, *, boolean, *>(getJwt, jwt => !!jwt);
export const hasCapability = (
  ability: Capability,
): (
  state: StateShape,
) => boolean => createSelector(
  getCapabilities,
  (capabilities: Capability[]) => capabilities.indexOf(ability) > -1,
);

export const hasPremium = hasCapability('premium');
