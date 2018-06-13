// @flow

import { createSelector } from 'reselect';

import { sortProjects } from '../core/projects';

const getAllProjects = state => state.projects.allIds.map(id => state.projects.byId[id]);

export const sortedProjects = createSelector(
  getAllProjects,
  sortProjects,
);
