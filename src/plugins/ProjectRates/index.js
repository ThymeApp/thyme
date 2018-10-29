// @flow

import loadOnCapability from 'epics/loadOnCapability';

import { canAddRates } from './selectors';

export default function registerProjectRates() {
  loadOnCapability(import('./async'), canAddRates);
}
