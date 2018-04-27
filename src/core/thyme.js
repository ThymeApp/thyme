// @flow

import differenceInMinutes from 'date-fns/difference_in_minutes';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import isEqual from 'date-fns/is_equal';
import startOfDay from 'date-fns/start_of_day';
import endOfDay from 'date-fns/end_of_day';
import leftPad from 'left-pad';

export function calculateDuration(from: string, to: string): number {
  const [fromHour, fromMinute] = from.split(':');
  const [toHour, toMinute] = to.split(':');

  const fromDate = Date.UTC(2000, 0, 1, parseInt(fromHour, 10), parseInt(fromMinute, 10), 0);
  const toDate = Date.UTC(2000, 0, 1, parseInt(toHour, 10), parseInt(toMinute, 10), 0);

  if (toDate < fromDate) {
    return 0;
  }

  return differenceInMinutes(toDate, fromDate);
}

export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration % 60);

  return `${leftPad(hours, 2, 0)}:${leftPad(minutes, 2, 0)}`;
}

export function timeElapsed(from: string, to: string) {
  if (from === '' || to === '') {
    return 'Invalid time';
  }

  return formatDuration(calculateDuration(from, to));
}

export function projectTimeEntries(
  project: projectType | { id: null, nameTree: Array<string> },
  time: Array<timeType>,
  from: Date | string,
  to: Date | string,
) {
  const startOfDayFrom = startOfDay(from);
  const endOfDayTo = endOfDay(to);

  return time
    .filter(entry => entry.project === project.id)
    .filter(entry => isAfter(entry.date, startOfDayFrom) || isEqual(entry.date, startOfDayFrom))
    .filter(entry => isBefore(entry.date, endOfDayTo) || isEqual(entry.date, endOfDayTo));
}

export function totalProjectTime(
  project: projectType | { id: null, nameTree: Array<string> },
  time: Array<timeType>,
  from: Date | string,
  to: Date | string,
): number {
  return projectTimeEntries(project, time, from, to)
    .reduce((total, entry) => total + calculateDuration(entry.start, entry.end), 0);
}
