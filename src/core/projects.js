// @flow

function getProjectTree(
  project: projectType,
  projects: Array<projectType>,
  current: Array<string> = [],
) {
  const projectNames = [project.name, ...current];

  if (project.parent) {
    const parent = projects.find(item => item.id === project.parent);

    if (parent) {
      return getProjectTree(
        parent,
        projects,
        projectNames,
      );
    }
  }

  return projectNames;
}

export function sortedProjects(projects: Array<projectType>) {
  const named = projects.map(project => ({
    ...project,
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
