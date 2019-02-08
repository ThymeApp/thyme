// @flow

import React from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';

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
};

function ProjectsList({
  projects,
  parent = '',
  level = 1,
  onUpdateProject,
  onRemoveProject,
  onArchiveProject,
}: ProjectsListProps): Element<typeof ProjectItem>[] {
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
      />
    ));
}

function mapStateToProps(state) {
  return {
    projects: allSortedProjects(state),
  };
}

export default connect(mapStateToProps)(ProjectsList);
