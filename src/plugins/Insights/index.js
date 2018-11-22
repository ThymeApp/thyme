// @flow

import { loadOnCapability } from 'register/plugin';

import { canSeeInsights } from './selectors';

export default function registerInsights(pluginInit: (name: string) => void) {
  loadOnCapability(() => import('./async'), canSeeInsights, { pluginInit });
}
