// @flow

import React from 'react';

import isSameDay from 'date-fns/is_same_day';
import addDays from 'date-fns/add_days';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import format from 'date-fns/format';

import { totalProjectTime } from 'core/thyme';

import type { ReportsProps } from 'sections/Reports/Reports';

function daysInDateRange(from: Date, to: Date): Date[] {
  const days = [];
  let dayToAdd = from;

  while (!isSameDay(dayToAdd, to)) {
    days.push(dayToAdd);
    dayToAdd = addDays(dayToAdd, 1);
  }

  days.push(to);

  return days;
}

export default ({ from, to, projects }: ReportsProps) => {
  const projectsWithTime = projects.filter(project => project.time > 0);

  if (projectsWithTime.length === 0) {
    return null;
  }

  const daysInRange = daysInDateRange(from, to);

  const days = daysInRange.map(day => ({
    day,
    projects: projectsWithTime.map((project) => {
      const dayEntries = project.entries.filter(entry => isSameDay(entry.start, day));

      const projectDetails = {
        name: project.name,
        nameTree: project.nameTree,
      };

      if (dayEntries.length === 0) {
        return {
          ...projectDetails,
          time: 0,
        };
      }

      return {
        ...projectDetails,
        time: totalProjectTime(
          project,
          dayEntries,
          dayEntries.reduce((a, b) => (isBefore(a.start, b.start) ? a : b)).start,
          dayEntries.reduce((a, b) => (isAfter(a.end, b.end) ? a : b)).end,
        ),
      };
    }),
  }));

  return (
    <section>
      {days.map(day => (
        <div>
          {format(day.day, 'D MMM YYYY')}
        </div>
      ))}
    </section>
  );
};
