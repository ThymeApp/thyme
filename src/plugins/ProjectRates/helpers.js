// @flow

import type { ProjectRatesReportProject } from './types';

export function totalProjectPrice(project: ProjectRatesReportProject) {
  if (project.time === 0 || !project.rate) {
    return 0;
  }

  return project.rate * (project.time / 60);
}
