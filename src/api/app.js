// @flow

import { get } from 'core/fetch';

export default function getAppVersion(): Promise<string> {
  return get('/version');
}
