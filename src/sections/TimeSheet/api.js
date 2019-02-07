// @flow

import { get } from 'core/fetch';

export function getTemporaryItem(): Promise<TempTimePropertyType> {
  return get('/get-temporary');
}
