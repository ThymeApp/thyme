// @flow

export function registerAccount(token: string | null = null) {
  return {
    type: 'ACCOUNT_REGISTER',
    token,
  };
}
