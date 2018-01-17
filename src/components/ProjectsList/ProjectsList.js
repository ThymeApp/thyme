// @flow

import React from 'react';
import type { Element } from 'react';

import ProjectItem from './ProjectItem';

import './ProjectsList.css';

type ProjectsListType = {
  projects: Array<projectTreeType>,
  parent?: string,
};

function ProjectsList({ projects, parent = '' }: ProjectsListType): Array<Element<any>> {
  return projects
    .filter(item => (parent === '' && item.parent === null) || item.parent === parent)
    .map(project => (
      <ProjectItem key={project.id} project={project} projects={projects} />
    ));
}

export default ProjectsList;
