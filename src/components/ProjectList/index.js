// @flow

import React from 'react';
import type { Element } from 'react';

type ProjectsListType = {
  projects: Array<projectTreeType>,
  parent?: string,
};

function ProjectsList({ projects, parent = '' }: ProjectsListType): Element<any> {
  return (
    <div>
      {projects
        .filter(item => (parent === '' && item.parent === null) || item.parent === parent)
        .map(project => (
          <div key={project.id}>
            {project.nameTree.join(' > ')}

            {ProjectsList({ projects, parent: project.id })}
          </div>
        ))}
    </div>
  );
}

export default ProjectsList;
