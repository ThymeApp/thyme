// @flow

type exportStateType = {
  time: {
    allIds: Array<string>,
    byId: {},
  },
  projects: {
    allIds: Array<string>,
    byId: {},
  },
};

export function stateToExport({ time, projects }: exportStateType) {
  return {
    time: time.allIds.map(id => time.byId[id]),
    projects: projects.allIds.map(id => projects.byId[id]),
  };
}

type importStateType = {
  time: Array<any>,
  projects: Array<any>,
}

function validTimeEntry(entry) {
  if (
    typeof entry.id !== 'string' ||
    (entry.project !== null && typeof entry.project !== 'string') ||
    typeof entry.date !== 'string' ||
    typeof entry.start !== 'string' ||
    typeof entry.end !== 'string' ||
    typeof entry.notes !== 'string' ||
    typeof entry.createdAt !== 'string' ||
    typeof entry.updatedAt !== 'string'
  ) {
    return false;
  }

  return true;
}

function validProjectEntry(entry) {
  if (
    typeof entry.id !== 'string' ||
    (entry.parent !== null && typeof entry.parent !== 'string') ||
    typeof entry.name !== 'string' ||
    typeof entry.createdAt !== 'string' ||
    typeof entry.updatedAt !== 'string'
  ) {
    return false;
  }

  return true;
}

export function validData({ time, projects }: importStateType) {
  if (
    !time || !projects ||
    !Array.isArray(time) || !Array.isArray(projects) ||
    !time.every(validTimeEntry) || !projects.every(validProjectEntry)
  ) {
    return false;
  }

  return true;
}
