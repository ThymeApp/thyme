// @flow

import { pluginInit } from 'actions/app';

import registerReducers from './reducers';
import registerInjectables from './injectables';

export default function registerPlugin({ store }: { store: ThymeStore }) {
  registerInjectables();
  registerReducers(store);

  store.dispatch(pluginInit('ProjectRates'));
}
