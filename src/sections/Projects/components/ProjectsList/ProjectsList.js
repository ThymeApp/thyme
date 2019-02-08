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
};

function ProjectsList({
  projects,
  parent = '',
  level = 1,
}: ProjectsListProps): Element<typeof ProjectItem>[] {
  return projects
    .filter(item => (parent === '' && item.parent === null) || item.parent === parent)
    .map(project => (
      <ProjectItem
        key={project.id}
        project={project}
        projects={projects}
        level={level}
      />
    ));
}

function mapStateToProps(state) {
  return {
    projects: allSortedProjects(state),
  };
}

export default connect(mapStateToProps)(ProjectsList);
