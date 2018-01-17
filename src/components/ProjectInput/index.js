import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

function getProjectTree(project, projects, current = []) {
  const projectNames = [project.name, ...current];

  if (project.parent) {
    return getProjectTree(
      projects.find(item => item.id === project.parent),
      projects,
      projectNames,
    );
  }

  return projectNames;
}

function sortedProjects(projects) {
  const named = projects.map(project => ({
    id: project.id,
    name: getProjectTree(project, projects).join(' > '),
  }));

  named.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }

    if (a.name < b.name) {
      return -1;
    }

    return 0;
  });

  return named;
}

function ProjectInput({ value, projects, handleChange }) {
  return (
    <Select
      name="project"
      autosize
      value={value}
      onChange={handleChange}
      options={
        sortedProjects(projects)
          .map(project => ({
            value: project.id,
            label: project.name,
          }))
      }
    />
  );
}

function mapStateToProps(state) {
  const { allIds, byId } = state.projects;
  const projects = allIds.map(id => byId[id]);

  return { projects };
}

export default connect(mapStateToProps)(ProjectInput);
