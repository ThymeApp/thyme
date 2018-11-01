// @flow

import loadOnCapability from 'epics/loadOnCapability';

import { canAddRates } from './selectors';

export default function registerProjectRates(store: ThymeStore) {
  loadOnCapability(() => import('./async'), canAddRates, { store });
}
