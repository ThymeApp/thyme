// @flow

import React from 'react';
import type { Element } from 'react';
import { useSelector } from 'react-redux';

import ProjectItem from './ProjectItem'; // eslint-disable-line import/no-cycle

import { allSortedProjects } from '../../selectors';

import './ProjectsList.css';

type ProjectsListProps = {
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
  const projects = useSelector(allSortedProjects);

  return projects
    .filter((item) => (parent === '' && item.parent === null) || item.parent === parent)
    .map((project) => (
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
