// @flow

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
    loadPlugin('Insights', () => import('./Insights')),
  ];
}

const createPluginInitDispatcher = (dispatch: ThymeDispatch) => (pluginName: string) => {
  dispatch(pluginInit(pluginName));
};

export default function loadPlugins(dispatch: ThymeDispatch) {
  Promise.all(pluginsList().map((p) => p()))
    .then((modules) => {
      modules
        .filter((m) => !!m)
        .forEach((m) => {
          if (typeof m !== 'boolean' && typeof m.default === 'function') {
            const dispatchPluginInit = createPluginInitDispatcher(dispatch);
            m.default(dispatchPluginInit);
          }
        });
    });
}
