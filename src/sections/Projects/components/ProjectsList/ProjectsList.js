// @flow

import React from 'react';
import type { Element } from 'react';

import { useMappedState } from 'core/useRedux';

import ProjectItem from './ProjectItem'; // eslint-disable-line import/no-cycle

import { allSortedProjects } from '../../selectors';

import './ProjectsList.css';

type ProjectsListProps = {
  projects: ProjectTreeType[];
  parent?: string;
  level?: number;
  onUpdateProject: (project: ProjectProps) => void;
  onRemoveProject: (id: string) => void;
  onArchiveProject: (id: string) => void;
  onChangeParent: (project: ProjectTreeType, parent: string | null) => void;
};

function ProjectsList({
  parent = '',
  level = 1,
  onUpdateProject,
  onRemoveProject,
  onArchiveProject,
  onChangeParent,
}: ProjectsListProps): Element<typeof ProjectItem>[] {
  const projects = useMappedState(allSortedProjects);

  return projects
    .filter(item => (parent === '' && item.parent === null) || item.parent === parent)
    .map(project => (
      <ProjectItem
        key={project.id}
        project={project}
        projects={projects}
        level={level}
        onUpdateProject={onUpdateProject}
        onRemoveProject={onRemoveProject}
        onArchiveProject={onArchiveProject}
        onChangeParent={onChangeParent}
      />
    ));
}

export default ProjectsList;
