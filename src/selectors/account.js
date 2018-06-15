// @flow

export const isLoggedIn = (state: storeShape) => !!state.account.jwt;
export const getJwt = (state: storeShape) => state.account.jwt;
