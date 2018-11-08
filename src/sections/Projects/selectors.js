// @flow

import { createSelector } from 'reselect';
import memoize from 'lodash/memoize';

import { sortProjects } from 'core/projects';

import { hasCapability } from 'sections/Account/selectors';

export const getAllProjects = (state: storeShape): projectType[] => state.projects.allIds
  .map(id => state.projects.byId[id])
  .filter(project => !project.removed);

export const sortedProjects = createSelector(
  getAllProjects,
  sortProjects,
);

const getProjectsById = (state: storeShape): { [id: string]: projectType } => state.projects.byId;

export const getProjectById = createSelector(
  getProjectsById,
  projects => memoize(id => projects[id]),
);

export const canAddRates = hasCapability('project_rates');
