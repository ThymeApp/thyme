// @flow

import React from 'react';
import { connect } from 'react-redux';

import { sortedProjects } from '../core/projects';

import NewProject from '../components/NewProject';
import ProjectList from '../components/ProjectList';

function Projects({ projects }: { projects: Array<projectType> }) {
  return (
    <div>
      <h2>Projects</h2>

      <section>
        <NewProject />
        <hr />
        <ProjectList projects={sortedProjects(projects)} />
      </section>
    </div>
  );
}

function mapStateToProps(state) {
  const { allIds, byId } = state.projects;
  const projects = allIds.map(id => byId[id]);

  return { projects };
}

export default connect(mapStateToProps)(Projects);
