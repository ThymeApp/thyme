// @flow

import { registerStore } from 'register/reducer';

import { pluginInit } from 'actions/app';

const resolveFalse = () => Promise.resolve(false);

function loadPlugin(name: string, importModule: () => Promise<*>): () => Promise<*> {
  if (!process.env.REACT_APP_THYME_PLUGINS) {
    return resolveFalse;
  }

  return process.env.REACT_APP_THYME_PLUGINS.split(',').indexOf(name) > -1 ? importModule
    : resolveFalse;
}

function pluginsList() {
  return [
    loadPlugin('ProjectRates', () => import('./ProjectRates')),
  ];
}

const createPluginInitDispatcher = (dispatch: ThymeDispatch) => (pluginName: string) => {
  dispatch(pluginInit(pluginName));
};

export default function registerPlugins(store: ThymeStore) {
  registerStore(store);

  Promise.all(pluginsList().map(p => p()))
    .then((modules) => {
      modules
        .filter(m => !!m)
        .forEach(m => typeof m !== 'boolean'
          && typeof m.default === 'function'
          && m.default(createPluginInitDispatcher(store.dispatch)));
    });
}
