// @flow

import isBefore from 'date-fns/is_before';

import { debugError, debugWarn } from './debug';

export type toExportType = {
  time: TimeShape;
  projects: ProjectsShape;
  reports: ReportsShape;
};

export type exportType = {
  time: TimeType[];
  projects: ProjectType[];
  reports: ReportType[];
};

export function stateToExport({ time, projects, reports }: toExportType): exportType {
  return {
    time: time.allIds.map((id) => time.byId[id]),
    projects: projects.allIds.map((id) => projects.byId[id]),
    reports: reports.allIds.map((id) => reports.byId[id]),
  };
}

type importStateType = {
  time: Array<any>,
  projects: Array<any>,
  reports: Array<any>,
}

function validTimeEntry(entry) {
  const isValid = !(typeof entry.id !== 'string'
    || (entry.project !== null && typeof entry.project !== 'string')
    || (typeof entry.start !== 'string' && typeof entry.start !== 'number')
    || (typeof entry.end !== 'string' && typeof entry.end !== 'number')
    || typeof entry.notes !== 'string'
    || typeof entry.createdAt !== 'string'
    || typeof entry.updatedAt !== 'string');

  if (!isValid) debugWarn('Invalid time entry', entry);

  return isValid;
}

function validProjectEntry(entry) {
  return !(typeof entry.id !== 'string'
    || (entry.parent !== null && typeof entry.parent !== 'string')
    || typeof entry.name !== 'string'
    || typeof entry.createdAt !== 'string'
    || typeof entry.updatedAt !== 'string');
}

function validReportEntry(entry) {
  return !(typeof entry.id !== 'string'
    || typeof entry.name !== 'string'
    || !Array.isArray(entry.filters)
    || !entry.filters.every((item) => typeof item === 'string' || item === null)
    || typeof entry.from !== 'string'
    || typeof entry.to !== 'string'
    || typeof entry.createdAt !== 'string');
}

export function parseImportData({ time = [], projects = [], reports = [] }: importStateType) {
  return { time, projects, reports };
}

export function validData({ time, projects, reports }: importStateType) {
  if (!time || !Array.isArray(time) || !time.every(validTimeEntry)) {
    debugError('Invalid `time` in import data');
    return false;
  }

  if (!projects || !Array.isArray(projects) || !projects.every(validProjectEntry)) {
    debugError('Invalid `projects` in import data');
    return false;
  }

  if (!reports || !Array.isArray(reports) || !reports.every(validReportEntry)) {
    debugError('Invalid `reports` in import data');
    return false;
  }

  // all is good
  return true;
}

function mergeOverwrite(oldList: any[] = [], newList: any[] = [], overwrite: boolean = true) {
  return [
    ...oldList.map((time) => {
      if (!overwrite || newList.length === 0) {
        return time;
      }

      const newItem = newList.find((item) => item.id === time.id);

      // return old time entry if updateAt is later then imported item
      if (
        newItem && newItem.updatedAt
        && time.updatedAt && isBefore(newItem.updatedAt, time.updatedAt)
      ) {
        return time;
      }

      return newItem || time;
    }),
    ...newList.filter((time) => !oldList.find((item) => item.id === time.id)),
  ];
}

export function mergeImport(
  currentData: exportType,
  newData: exportType,
  overwrite: boolean = true,
): exportType {
  return {
    time: mergeOverwrite(currentData.time, newData.time, overwrite),
    projects: mergeOverwrite(currentData.projects, newData.projects, overwrite),
    reports: mergeOverwrite(currentData.reports, newData.reports, overwrite),
  };
}
