// @flow

import React from 'react';
import { connect } from 'react-redux';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';

import BuyMessage from 'components/BuySubscription/Message';

import { hasPremium, isLoaded } from 'sections/Account/selectors';

import { sortedProjects } from './selectors';

import NewProject from './components/NewProject';
import ProjectsList from './components/ProjectsList';

type ProjectsProps = {
  projects: Array<ProjectTreeType>;
  showUpgrade: boolean;
};

function Projects({ projects, showUpgrade }: ProjectsProps) {
  return (
    <Container>
      <Header as="h1">
        Projects
      </Header>

      <section>
        <NewProject />
        <Divider />
        <ProjectsList projects={projects} />
        {showUpgrade && <BuyMessage>Want to add hourly rates to projects?</BuyMessage>}
      </section>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    projects: sortedProjects(state),
    showUpgrade: !hasPremium(state) && isLoaded(state),
  };
}

export default connect(mapStateToProps)(Projects);
