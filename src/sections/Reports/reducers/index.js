// @flow

import { createExtendableReducer } from 'reducers/registerReducer';

import createReportReducer from './report';

const byId = report => (state = {}, action) => {
  switch (action.type) {
    // targeted updates
    case 'ADD_REPORT':
    case 'REMOVE_REPORT':
      return {
        ...state,
        [action.id]: report(state[action.id], action),
      };
    case 'IMPORT_JSON_DATA':
      return action.reports.reduce((newState, item) => ({
        ...newState,
        [item.id]: item,
      }), {});
    default:
      return state;
  }
};

function allIds(state = [], action) {
  switch (action.type) {
    case 'ADD_REPORT':
      return [...state, action.id];
    case 'IMPORT_JSON_DATA':
      return action.reports.map(item => item.id);
    default:
      return state;
  }
}

export default () => createExtendableReducer('reports', {
  byId: byId(createReportReducer()),
  allIds,
});
