// @flow

import { post } from 'core/fetch';

export function changePassword(currentPassword: string, password: string): Promise<string> {
  return post('/change-password', { currentPassword, password });
}
