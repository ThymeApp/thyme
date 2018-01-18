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
