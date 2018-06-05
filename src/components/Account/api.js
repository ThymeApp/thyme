// @flow

import { post } from '../../core/fetch';

export function registerUser(email: string, password: string): Promise<string> {
  return post('/register', { email, password });
}
