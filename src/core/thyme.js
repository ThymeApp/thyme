// @flow

import differenceInMinutes from 'date-fns/difference_in_minutes';

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
