// @flow

import differenceInMinutes from 'date-fns/difference_in_minutes';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import isEqual from 'date-fns/is_equal';

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
  const minutes = duration % 60;

  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

export function totalProjectTime(
  project: projectType,
  times: Array<timeType>,
  from: Date,
  to: Date,
): number {
  return times
    .filter(time => time.project === project.id)
    .filter(time => isAfter(time.date, from) || isEqual(time.date, from))
    .filter(time => isBefore(time.date, to) || isEqual(time.date, to))
    .reduce((total, time) => total + calculateDuration(time.start, time.end), 0);
}
