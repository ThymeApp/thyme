// @flow

function getProjectTree(
  project: projectType,
  projects: Array<projectType>,
  current: Array<string> = [],
): Array<string> {
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

export function sortedProjects(projects: Array<projectType>): Array<projectTreeType> {
  const named = projects
    .map(project => ({
      ...project,
      nameTree: getProjectTree(project, projects),
    }));

  named.sort((a, b) => {
    const atree = a.nameTree.join('');
    const btree = b.nameTree.join('');

    if (atree > btree) {
      return 1;
    }

    if (atree < btree) {
      return -1;
    }

    return 0;
  });

  return named;
}
