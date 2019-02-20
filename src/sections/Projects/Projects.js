// @flow

import React from 'react';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';

import { useMappedState, useDispatch } from 'core/useRedux';
import { isDescendant } from 'core/projects';

import BuyMessage from 'components/BuySubscription/Message';

import { alert } from 'actions/app';

import { hasPremium, isLoaded } from 'sections/Account/selectors';

import { allSortedProjects } from './selectors';

import NewProject from './components/NewProject';
import ProjectsList from './components/ProjectsList';

import { archiveProject, removeProject, updateProject } from './actions';

function Projects() {
  const { projects, showUpgrade } = useMappedState(state => ({
    projects: allSortedProjects(state),
    showUpgrade: !hasPremium(state) && isLoaded(state),
  }));

  const {
    showAlert,
    onUpdateProject,
    onRemoveProject,
    onArchiveProject,
  } = useDispatch(dispatch => ({
    onUpdateProject: (project: ProjectProps) => dispatch(updateProject(project)),
    onRemoveProject: (id: string) => dispatch(removeProject(id)),
    onArchiveProject: (id: string) => dispatch(archiveProject(id)),
    showAlert: (message: string) => dispatch(alert(message)),
  }));

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
          onChangeParent={(project: ProjectTreeType, parent: string | null) => {
            // ignore if project is descendant
            if (isDescendant(project.id, parent, projects)) {
              return;
            }

            onUpdateProject({
              ...project,
              parent,
            });
          }}
        />
        {showUpgrade && <BuyMessage>Want to add hourly rates to projects?</BuyMessage>}
      </section>
    </Container>
  );
}

export default Projects;
