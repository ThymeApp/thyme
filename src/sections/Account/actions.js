// @flow

export function registerAccount(token: string | null = null) {
  return {
    type: 'ACCOUNT_REGISTER',
    token,
  };
}

export function updateToken(token: string | null = null) {
  return {
    type: 'ACCOUNT_UPDATE_TOKEN',
    token,
  };
}

export function loginAccount(token: string | null = null) {
  return {
    type: 'ACCOUNT_LOGIN',
    token,
  };
}

export function logout() {
  return { type: 'LOG_OUT' };
}
