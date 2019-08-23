// @flow

import leftPad from 'left-pad';

import differenceInSeconds from 'date-fns/difference_in_seconds';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import isEqual from 'date-fns/is_equal';
import startOfDay from 'date-fns/start_of_day';
import endOfDay from 'date-fns/end_of_day';
import startOfMinute from 'date-fns/start_of_minute';
import startOfHour from 'date-fns/start_of_hour';
import format from 'date-fns/format';
import differenceInMinutes from 'date-fns/difference_in_minutes';
import addMinutes from 'date-fns/add_minutes';

type HasStart = { start: Date };

export const sortByTime = (dateSort: SortDirection) => (a: HasStart, b: HasStart) => {
  if (
    (isBefore(a.start, b.start) && dateSort === 'asc')
    || (isBefore(b.start, a.start) && dateSort === 'desc')
  ) {
    return -1;
  }

  if (
    (isAfter(a.start, b.start) && dateSort === 'asc')
    || (isAfter(b.start, a.start) && dateSort === 'desc')
  ) {
    return 1;
  }

  return 0;
};

export function calculateDuration(
  from: Date | string,
  to: Date | string,
  precise: boolean = false,
): number {
  if (isBefore(to, from)) {
    return 0;
  }

  return differenceInSeconds(
    precise ? to : startOfMinute(to),
    precise ? from : startOfMinute(from),
  );
}

export function formatDuration(duration: number, withSeconds: boolean = false): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration / 60) % 60);
  const seconds = Math.floor(duration % 60);

  const secondsString = withSeconds ? `:${leftPad(seconds.toString(), 2, 0)}` : '';

  return `${hours}:${leftPad(minutes.toString(), 2, 0)}${secondsString}`;
}

function getRoundedMinutes(round: Rounding, diffMinutes: number, roundAmount: number) {
  if (round === 'none') {
    return diffMinutes;
  }

  return Math[round](diffMinutes / roundAmount) * roundAmount;
}

export function timeElapsed(
  from: Date | string,
  to: Date | string,
  precise: boolean = false,
  withSeconds: boolean = false,
  round?: Rounding = 'none',
  roundAmount?: number = 0,
) {
  if (from === '' || to === '') {
    return 'Invalid time';
  }

  return formatDuration(
    getRoundedMinutes(
      round,
      calculateDuration(from, to, precise) / 60,
      roundAmount,
    ) * 60,
    withSeconds,
  );
}

export function projectTimeEntries(
  project: ProjectType | { id: null, nameTree: Array<string> },
  time: Array<TimeType>,
  from: Date | string,
  to: Date | string,
): Array<TimeType> {
  const startOfDayFrom = startOfDay(from);
  const endOfDayTo = endOfDay(to);

  return time
    .filter((entry) => entry.project === project.id)
    .filter((entry) => isAfter(entry.start, startOfDayFrom) || isEqual(entry.start, startOfDayFrom))
    .filter((entry) => isBefore(entry.end, endOfDayTo) || isEqual(entry.end, endOfDayTo));
}

export function totalTimeFromEntries(
  entries: TimeType[],
  round: Rounding,
  roundAmount: number,
  roundPerEntry: boolean,
) {
  return entries.reduce((total, entry) => total + getRoundedMinutes(
    roundPerEntry ? round : 'none',
    calculateDuration(entry.start, entry.end) / 60,
    roundAmount,
  ), 0);
}

export function totalProjectTime(
  project: ProjectType | { id: null, nameTree: Array<string> },
  time: Array<TimeType>,
  from: Date | string,
  to: Date | string,
  roundPerEntry?: boolean = false,
  round?: Rounding = 'none',
  roundAmount?: number = 0,
): number {
  const projectTotal = totalTimeFromEntries(
    projectTimeEntries(project, time, from, to),
    round,
    roundAmount,
    roundPerEntry,
  );

  return getRoundedMinutes(
    round,
    projectTotal,
    roundAmount,
  );
}

export const formatTime = (date: Date) => format(date, 'HH:mm');

export function roundTime(
  roundAmount: number,
  round: Rounding,
  date: Date,
  startDate: Date = startOfHour(date),
): Date {
  if (round === 'none') {
    return date;
  }

  const diffMinutes = differenceInMinutes(date, startDate);

  return addMinutes(startDate, getRoundedMinutes(round, diffMinutes, roundAmount));
}
