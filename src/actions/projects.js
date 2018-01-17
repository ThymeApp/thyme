export function addProject(entry) {
  return {
    type: 'ADD_PROJECT',
    ...entry,
  };
}

export function updateProject(entry) {
  return {
    type: 'UPDATE_PROJECT',
    ...entry,
  };
}

export function removeProject(id) {
  return {
    type: 'REMOVE_PROJECT',
    id,
  };
}
