// @flow

import { loadOnPremium } from 'register/plugin';

export default function registerProjectRates(pluginInit: (name: string) => void) {
  loadOnPremium(() => import('./async'), { pluginInit });
}
