// @flow

import shortid from 'shortid';

export function addProject(
  entry: { colour: ProjectColour | null, parent: string | null, name: string },
) {
  return {
    type: 'ADD_PROJECT',
    id: shortid.generate(),
    ...entry,
  };
}

export function updateProject(entry: ProjectProps) {
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

export function archiveProject(id: string) {
  return {
    type: 'ARCHIVE_PROJECT',
    id,
  };
}

export function truncateProjects() {
  return { type: 'TRUNCATE_PROJECTS' };
}
