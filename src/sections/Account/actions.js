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

export function accountChecked() {
  return { type: 'ACCOUNT_CHECKED' };
}

export function accountInit() {
  return { type: 'ACCOUNT_INIT' };
}

export function receiveAccountInformation(information: AccountInformation) {
  return {
    type: 'ACCOUNT_RECEIVE_INFORMATION',
    information,
  };
}

export function getAccountInformation() {
  return { type: 'ACCOUNT_FETCH_INFORMATION' };
}

export function updateAccountInformation() {
  return { type: 'ACCOUNT_UPDATE_INFORMATION' };
}
