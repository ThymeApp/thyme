// @flow

import React from 'react';
import { connect } from 'react-redux';

import isSameDay from 'date-fns/is_same_day';

import {
  getDurationRounding,
  getDurationAmount,
  getRoundingOn,
} from 'sections/Settings/selectors';
import { getAllProjects } from 'sections/Projects/selectors';

import { updateTime, removeTime } from '../../actions';

import { ListEntry } from '../Entry';
import DayHeader from './DayHeader';

type TimeTableType = {
  entries: TimeType[];
  projects: ProjectType[];
  now: Date;
  round: Rounding;
  roundAmount: number;
  enabledNotes: boolean;
  enabledProjects: boolean;
  onAddProject: (project: string) => string;
  onEntryUpdate: (entry: TimePropertyType) => void;
  onEntryRemove: (entry: TimeType | TimePropertyType) => void;
};

function TimeTable({
  entries,
  projects,
  now,
  round,
  roundAmount,
  enabledNotes,
  enabledProjects,
}: TimeTableType) {
  const days = [];

  const firstEntries = entries.filter((entry) => {
    if (days.some(day => isSameDay(entry.start, day))) {
      return false;
    }

    days.push(entry.start);

    return true;
  });

  return (
    <section className="TimeSheet__Entries">
      {entries.map(entry => (
        <div key={entry.id}>
          {firstEntries.find(e => e.id === entry.id) && (
            <DayHeader
              date={entry.start}
              entries={entries.filter(e => isSameDay(e.start, entry.start))}
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
          />
        </div>
      ))}
    </section>
  );
}

function mapStateToProps(state) {
  const roundingOn = getRoundingOn(state);
  const projects = getAllProjects(state);

  return {
    projects,
    round: roundingOn === 'entries' ? getDurationRounding(state) : 'none',
    roundAmount: roundingOn === 'entries' ? getDurationAmount(state) : 0,
  };
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    onEntryUpdate(entry) {
      dispatch(updateTime(entry));
    },
    onEntryRemove(entry) {
      dispatch(removeTime(entry.id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);
