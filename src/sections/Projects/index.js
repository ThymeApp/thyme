// @flow

import React from 'react';
import { connect } from 'react-redux';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';

import { sortedProjects } from './selectors';

import NewProject from './components/NewProject/index';
import ProjectsList from './components/ProjectsList/index';

function Projects({ projects }: { projects: Array<projectTreeType> }) {
  return (
    <Container>
      <Header as="h1">
        Projects
      </Header>

      <section>
        <NewProject />
        <Divider />
        <ProjectsList projects={projects} />
      </section>
    </Container>
  );
}

function mapStateToProps(state) {
  return { projects: sortedProjects(state) };
}

export default connect(mapStateToProps)(Projects);
