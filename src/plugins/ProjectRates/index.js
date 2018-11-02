// @flow

import { loadOnCapability } from 'register/plugin';

import { canAddRates } from './selectors';

export default function registerProjectRates(store: ThymeStore) {
  loadOnCapability(() => import('./async'), canAddRates, { store });
}
