// @flow

import registerInjectables from './injectables';

export default function registerPlugin({ pluginInit }: {pluginInit: (name: string) => void}) {
  registerInjectables();

  pluginInit('Insights');
}
