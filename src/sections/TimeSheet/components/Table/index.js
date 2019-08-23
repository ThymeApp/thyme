// @flow

import React from 'react';
import { useSelector } from 'react-redux';

import isSameDay from 'date-fns/is_same_day';

import { useActions } from 'core/useActions';

import {
  getDurationRounding,
  getDurationAmount,
  getRoundingOn,
} from 'sections/Settings/selectors';
import { getAllProjects } from 'sections/Projects/selectors';

import { updateTime, removeTime } from '../../actions';

import DayHeader from './DayHeader';
import ListEntry from './ListEntry';

type TimeTableType = {
  entries: TimeType[];
  now: Date;
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  onAddProject: (project: string, entry?: TimeType | TimePropertyType) => string;
};

const selectors = (state) => {
  const roundingOn = getRoundingOn(state);
  return {
    projects: getAllProjects(state),
    round: roundingOn === 'entries' ? getDurationRounding(state) : 'none',
    roundAmount: roundingOn === 'entries' ? getDurationAmount(state) : 0,
  };
};

const actions = [
  updateTime,
  (entry: TimeType) => removeTime(entry.id),
];

function TimeTable({
  entries,
  now,
  enabledNotes,
  enabledProjects,
  enabledEndDate,
  onAddProject,
}: TimeTableType) {
  const {
    projects,
    round,
    roundAmount,
  } = useSelector(selectors);

  const [onEntryUpdate, onEntryRemove] = useActions(actions);

  const days = [];

  const firstEntries = entries.filter((entry) => {
    if (days.some((day) => isSameDay(entry.start, day))) {
      return false;
    }

    days.push(entry.start);

    return true;
  });

  return (
    <section className="TimeSheet__Entries">
      {entries.map((entry) => (
        <div key={entry.id}>
          {firstEntries.find((e) => e.id === entry.id) && (
            <DayHeader
              date={entry.start}
              entries={entries.filter((e) => isSameDay(e.start, entry.start))}
              round={round}
              roundAmount={roundAmount}
            />
          )}
          <ListEntry
            round={round}
            roundAmount={roundAmount}
            projects={projects}
            entry={entry}
            now={now}
            enabledNotes={enabledNotes}
            enabledProjects={enabledProjects}
            enabledEndDate={enabledEndDate}
            onRemove={onEntryRemove}
            onEntryUpdate={onEntryUpdate}
            onAddProject={onAddProject}
          />
        </div>
      ))}
    </section>
  );
}

export default TimeTable;
