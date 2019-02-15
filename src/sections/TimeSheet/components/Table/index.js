// @flow

import React from 'react';
import { connect } from 'react-redux';

import {
  getDurationRounding,
  getDurationAmount,
  getRoundingOn,
} from 'sections/Settings/selectors';
import { getAllProjects } from 'sections/Projects/selectors';

import { updateTime, removeTime } from '../../actions';

import { ListEntry } from '../Entry';

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
  return (
    <section className="TimeSheet__Entries">
      {entries.map(entry => (
        <ListEntry
          key={entry.id}
          round={round}
          roundAmount={roundAmount}
          projects={projects}
          entry={entry}
          now={now}
          enabledNotes={enabledNotes}
          enabledProjects={enabledProjects}
        />
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
