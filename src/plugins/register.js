// @flow

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

export default function registerPlugins(store: ThymeStore) {
  Promise.all(pluginsList().map(p => p()))
    .then((modules) => {
      modules
        .filter(m => !!m)
        .forEach(m => typeof m.default === 'function' && m.default(store));
    });
}
