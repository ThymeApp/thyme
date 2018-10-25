// @flow

import { post, get } from 'core/fetch';
import type { exportType } from 'core/importExport';

export function login(email: string, password: string): Promise<string> {
  return post('/login', { email, password });
}

export function registerUser(email: string, password: string): Promise<string> {
  return post('/register', { email, password });
}

export function refreshToken(): Promise<string> {
  return post('/refresh-token');
}

export function getState(): Promise<exportType> {
  return get('/get-state');
}

type AccountInformationResponse = {
  capabilities: capability[];
};

export function getAccountInformation(): Promise<AccountInformationResponse> {
  return get('/account-information');
}
