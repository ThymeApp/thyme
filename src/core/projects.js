// @flow

export function isDescendant(from: string, to: string | null, projects: Array<ProjectTreeType>) {
  if (from === to) {
    return true;
  }

  const toProject = projects.find(project => project.id === to);

  if (!toProject) {
    return false;
  }

  if (toProject.parent === from) {
    return true;
  }

  if (toProject.parent === null) {
    return false;
  }

  return isDescendant(from, toProject.parent, projects);
}

function getProjectTree(
  project: ProjectType,
  projects: Array<ProjectType>,
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

export function sortProjects(projects: Array<ProjectType>): Array<ProjectTreeType> {
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
