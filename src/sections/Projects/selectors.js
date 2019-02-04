// @flow

import { createSelector } from 'reselect';

import { sortProjects } from 'core/projects';

import { hasCapability } from 'sections/Account/selectors';

export const getAllProjects = (state: StateShape): ProjectType[] => state.projects.allIds
  .map(id => state.projects.byId[id])
  .filter(project => !project.removed);

const unarchivedProjects = createSelector<StateShape, *, *, *>(
  getAllProjects,
  projects => projects.filter(project => !project.archived),
);

export const sortedProjects = createSelector<StateShape, *, *, *>(
  unarchivedProjects,
  sortProjects,
);

export const allSortedProjects = createSelector<StateShape, *, *, *>(
  getAllProjects,
  sortProjects,
);

export const canAddRates = hasCapability('project_rates');
