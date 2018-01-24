// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

import { sortedProjects } from '../core/projects';

import NewProject from '../components/NewProject';
import ProjectsList from '../components/ProjectsList';

function Projects({ projects }: { projects: Array<projectType> }) {
  return (
    <Container>
      <Header as="h1">Projects</Header>

      <section>
        <NewProject />
        <hr />
        <ProjectsList projects={sortedProjects(projects)} />
      </section>
    </Container>
  );
}

function mapStateToProps(state) {
  const { allIds, byId } = state.projects;
  const projects = allIds.map(id => byId[id]);

  return { projects };
}

export default connect(mapStateToProps)(Projects);
