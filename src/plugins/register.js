// @flow

import ProjectRates from './ProjectRates';

export default function registerPlugins(store: ThymeStore) {
  [
    ProjectRates,
  ].forEach(f => f(store));
}
