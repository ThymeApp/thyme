// @flow

import React from 'react';
import type { Element } from 'react';

import ProjectItem from './ProjectItem';

import './ProjectList.css';

type ProjectsListType = {
  projects: Array<projectTreeType>,
  parent?: string,
};

function ProjectsList({ projects, parent = '' }: ProjectsListType): Element<any> {
  return (
    <div className="ProjectList">
      {projects
        .filter(item => (parent === '' && item.parent === null) || item.parent === parent)
        .map(project => (
          <ProjectItem key={project.id} project={project} projects={projects} />
        ))}
    </div>
  );
}

export default ProjectsList;
