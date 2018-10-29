// @flow

import ProjectRates from './ProjectRates';

export default function registerPlugins() {
  [
    ProjectRates,
  ].forEach(f => f());
}
