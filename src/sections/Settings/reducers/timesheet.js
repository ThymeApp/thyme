// @flow

import { create } from 'register/reducer';

function perPage(state: number = 10, action) {
  switch (action.type) {
    case 'UPDATE_PER_PAGE':
      return action.perPage;
    default:
      return state;
  }
}

function enableNotes(state: boolean = true, action) {
  switch (action.type) {
    case 'ENABLE_NOTES':
      return true;
    case 'DISABLE_NOTES':
      return false;
    default:
      return state;
  }
}

function enableProjects(state: boolean = true, action) {
  switch (action.type) {
    case 'ENABLE_PROJECTS':
      return true;
    case 'DISABLE_PROJECTS':
      return false;
    default:
      return state;
  }
}

function enableEndDate(state: boolean = false, action) {
  switch (action.type) {
    case 'ENABLE_END_DATE':
      return true;
    case 'DISABLE_END_DATE':
      return false;
    default:
      return state;
  }
}

export default () => create('settings.timesheet', {
  perPage,
  enableNotes,
  enableProjects,
  enableEndDate,
});
