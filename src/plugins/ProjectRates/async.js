// @flow

import registerReducers from './reducers';
import registerInjectables from './injectables';

export default function registerPlugin({ pluginInit }: {pluginInit: (name: string) => void}) {
  registerReducers();
  registerInjectables();

  pluginInit('ProjectRates');
}
