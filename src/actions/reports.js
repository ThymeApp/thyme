// @flow

import shortid from 'shortid';

export function addReport(name: string, filters: Array<string>, from: Date, to: Date) {
  return {
    type: 'ADD_REPORT',
    id: shortid.generate(),
    name,
    filters,
    from,
    to,
  };
}

export function removeReport(id: string) {
  return { type: 'REMOVE_REPORT', id };
}
