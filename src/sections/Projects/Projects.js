// @flow

import React from 'react';
import { connect } from 'react-redux';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';

import BuyMessage from 'components/BuySubscription/Message';

import { alert } from 'actions/app';

import { hasPremium, isLoaded } from 'sections/Account/selectors';

import { allSortedProjects } from './selectors';

import NewProject from './components/NewProject';
import ProjectsList from './components/ProjectsList';

import { archiveProject, removeProject, updateProject } from './actions';

type ProjectsProps = {
  projects: Array<ProjectTreeType>;
  showUpgrade: boolean;
  showAlert: (message: string) => void;
  onUpdateProject: (project: ProjectProps) => void;
  onRemoveProject: (id: string) => void;
  onArchiveProject: (id: string) => void;
};

function Projects({
  projects,
  showUpgrade,
  showAlert,
  onUpdateProject,
  onRemoveProject,
  onArchiveProject,
}: ProjectsProps) {
  return (
    <Container>
      <Header as="h1">
        Projects
      </Header>

      <section>
        <NewProject />
        <Divider />
        <ProjectsList
          projects={projects}
          onUpdateProject={onUpdateProject}
          onRemoveProject={(id: string) => {
            if (projects.find(item => item.parent === id)) {
              showAlert('This project has children, a parent cannot be removed.');
              return;
            }

            onRemoveProject(id);
          }}
          onArchiveProject={onArchiveProject}
        />
        {showUpgrade && <BuyMessage>Want to add hourly rates to projects?</BuyMessage>}
      </section>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    projects: allSortedProjects(state),
    showUpgrade: !hasPremium(state) && isLoaded(state),
  };
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    onUpdateProject(project: ProjectProps) {
      dispatch(updateProject(project));
    },

    onRemoveProject(id: string) {
      dispatch(removeProject(id));
    },

    onArchiveProject(id: string) {
      dispatch(archiveProject(id));
    },

    showAlert(message: string) {
      dispatch(alert(message));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
