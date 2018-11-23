// @flow

import React from 'react';

import isSameDay from 'date-fns/is_same_day';
import addDays from 'date-fns/add_days';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';

import { totalProjectTime } from 'core/thyme';
import { formatShortDate } from 'core/intl';

import { colours } from 'sections/Reports/components/Charts';

import './Insights.css';

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

function totalTime(projects) {
  return projects.reduce((accTime, project) => accTime + project.time, 0);
}

export default ({ from, to, projects }: ReportsProps) => {
  const projectsWithTime = projects.filter(project => project.time > 0);

  if (projectsWithTime.length === 0) {
    return null;
  }

  const daysInRange = daysInDateRange(from, to);

  const days = daysInRange.map(day => ({
    day,
    projects: projectsWithTime.map((project, index) => {
      const dayEntries = project.entries.filter(entry => isSameDay(entry.start, day));

      const projectDetails = {
        id: project.id,
        name: project.name,
        nameTree: project.nameTree,
        colour: colours[index],
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

  const barHeight = 200;
  const longestDay = days.reduce((highest, day) => {
    const dayTime = totalTime(day.projects);
    return dayTime > highest ? dayTime : highest;
  }, 0);

  return (
    <table className="Insights">
      <tr className="Insights__Days Insights__Days--bars">
        {days.map(day => (
          <td key={day.day} className="Insights__Days-Item">
            <div className="Insights__Days-ItemBars">
              {day.projects.filter(project => project.time > 0).map(project => (
                <div
                  className="Insights__Bar"
                  key={project.id}
                  style={{
                    height: barHeight * (project.time / longestDay),
                    backgroundColor: project.colour,
                  }}
                />
              ))}
            </div>
          </td>
        ))}
      </tr>
      <tr className="Insights__Days Insights__Days--dates">
        {days.map(day => (
          <td key={day.day} className="Insights__Days-Item">
            {formatShortDate(day.day, days.length)}
          </td>
        ))}
      </tr>
    </table>
  );
};
