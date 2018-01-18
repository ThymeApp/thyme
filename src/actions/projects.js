// @flow

export function addProject(entry: projectType) {
  return {
    type: 'ADD_PROJECT',
    ...entry,
  };
}

export function updateProject(entry: projectType) {
  return {
    type: 'UPDATE_PROJECT',
    ...entry,
  };
}

export function removeProject(id: string) {
  return {
    type: 'REMOVE_PROJECT',
    id,
  };
}
