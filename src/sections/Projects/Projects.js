// @flow

import React from 'react';
import { connect } from 'react-redux';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';

import { canAddRates as canAddRatesSelector, sortedProjects } from './selectors';

import NewProject from './components/NewProject';
import ProjectsList from './components/ProjectsList';

type ProjectsProps = {
  canAddRates: boolean;
  projects: Array<projectTreeType>;
};

function Projects({ canAddRates, projects }: ProjectsProps) {
  return (
    <Container>
      <Header as="h1">
        Projects
      </Header>

      <section>
        <NewProject />
        <Divider />
        <ProjectsList canAddRates={canAddRates} projects={projects} />
      </section>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    canAddRates: canAddRatesSelector(state),
    projects: sortedProjects(state),
  };
}

export default connect(mapStateToProps)(Projects);
