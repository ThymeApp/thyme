// @flow

import { createSelector } from 'reselect';

import { sortProjects } from 'core/projects';

import { hasCapability } from 'sections/Account/selectors';

export const getAllProjects = (state: StateShape): ProjectType[] => state.projects.allIds
  .map(id => state.projects.byId[id])
  .filter(project => !project.removed);

export const sortedProjects = createSelector<StateShape, *, *, *>(
  getAllProjects,
  sortProjects,
);

export const canAddRates = hasCapability('project_rates');
