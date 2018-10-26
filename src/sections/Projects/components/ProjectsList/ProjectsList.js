// @flow

import React from 'react';
import type { Element } from 'react';

import ProjectItem from './ProjectItem'; // eslint-disable-line import/no-cycle

import './ProjectsList.css';

type ProjectsListProps = {
  canAddRates: boolean;
  projects: Array<projectTreeType>;
  parent?: string;
  level?: number;
};

function ProjectsList({
  canAddRates,
  projects,
  parent = '',
  level = 1,
}: ProjectsListProps): Element<typeof ProjectItem>[] {
  return projects
    .filter(item => (parent === '' && item.parent === null) || item.parent === parent)
    .map(project => (
      <ProjectItem
        key={project.id}
        canAddRates={canAddRates}
        project={project}
        projects={projects}
        level={level}
      />
    ));
}

export default ProjectsList;
