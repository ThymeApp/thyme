// @flow

import React from 'react';
import { useSelector } from 'react-redux';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';

import { useTrackPageview } from 'core/analytics';
import { isDescendant } from 'core/projects';
import { useActions } from 'core/useActions';

import BuyMessage from 'components/BuySubscription/Message';

import { alert } from 'actions/app';

import { hasPremium, isLoaded } from 'sections/Account/selectors';

import { allSortedProjects } from './selectors';

import NewProject from './components/NewProject';
import ProjectsList from './components/ProjectsList';

import { archiveProject, removeProject, updateProject } from './actions';

const selectors = (state) => ({
  projects: allSortedProjects(state),
  showUpgrade: !hasPremium(state) && isLoaded(state),
});

function Projects() {
  useTrackPageview('Projects');

  const { projects } = useSelector(selectors);

  const showUpgrade = false;

  const [
    showAlert,
    onUpdateProject,
    onRemoveProject,
    onArchiveProject,
  ] = useActions([
    alert,
    updateProject,
    removeProject,
    archiveProject,
  ]);

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
            if (projects.find((item) => item.parent === id)) {
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
