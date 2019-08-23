// @flow

export function isDescendant(from: string, to: string | null, projects: Array<ProjectTreeType>) {
  if (from === to) {
    return true;
  }

  const toProject = projects.find((project) => project.id === to);

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
    const parent = projects.find((item) => item.id === project.parent);

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

export function sortProjects(
  projects: Array<ProjectType>,
  project: ?ProjectType,
): Array<ProjectTreeType> {
  let sortedByName = projects;

  if (!project) {
    sortedByName = [...projects];

    sortedByName.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }

      if (a.name < b.name) {
        return -1;
      }

      return 0;
    });
  }

  const parent = (project && project.id) || null;

  return sortedByName
    .filter((item) => item.parent === parent)
    .reduce((acc, item) => [
      ...acc,
      item,
      ...sortProjects(sortedByName, item),
    ], [])
    .filter((item) => !!item)
    .map((item) => ({
      ...item,
      nameTree: getProjectTree(item, projects),
    }));
}

export function treeDisplayName(
  project: ProjectTreeType,
  delimiter: string = ' > ',
): string {
  return project.nameTree.join(delimiter);
}
