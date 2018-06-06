// @flow

export function registerAccount(token: string | null = null) {
  return {
    type: 'ACCOUNT_REGISTER',
    token,
  };
}

export function logout() {
  return { type: 'LOG_OUT' };
}
