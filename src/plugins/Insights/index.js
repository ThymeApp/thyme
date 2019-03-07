// @flow

import { loadOnPremium } from 'register/plugin';

export default function registerInsights(pluginInit: (name: string) => void) {
  loadOnPremium(() => import('./async'), { pluginInit });
}
