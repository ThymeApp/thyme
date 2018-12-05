// @flow

import { loadOnCapability } from 'register/plugin';

import { canAddRates } from './selectors';

export default function registerProjectRates(pluginInit: (name: string) => void) {
  debugger;
  loadOnCapability(() => import('./async'), canAddRates, { pluginInit });
}
