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

export function getAccountInformation(): Promise<AccountInformation> {
  return get('/account-information');
}

export function buySubscription(token: string, values: any): Promise<Boolean> {
  return post('/buy-subscription', { token, values });
}

export function getSubscriptions(): Promise<SubscriptionInfo[]> {
  return get('/list-subscriptions');
}

export function changePassword(currentPassword: string, password: string): Promise<string> {
  return post('/change-password', { currentPassword, password });
}
