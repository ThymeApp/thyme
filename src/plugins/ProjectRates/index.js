// @flow

import { loadOnCapability } from 'register/plugin';

import { canAddRates } from './selectors';

export default function registerProjectRates(pluginInit: (name: string) => void) {
  loadOnCapability(() => import('./async'), canAddRates, { pluginInit });
}
