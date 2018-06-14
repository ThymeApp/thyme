// @flow

export const isLoggedIn = (state: storeShape) => !!state.account.jwt;
