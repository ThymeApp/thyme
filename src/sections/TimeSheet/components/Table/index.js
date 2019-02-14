// @flow

import React from 'react';
import { connect } from 'react-redux';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';

import { useResponsive } from 'components/Responsive';

import {
  getDurationRounding,
  getDurationAmount,
  getRoundingOn,
} from 'sections/Settings/selectors';

import { updateTime, removeTime } from '../../actions';

import { Entry } from '../Entry';

type TimeTableType = {
  entries: Array<TimeType>;
  now: Date;
  round: Rounding;
  roundAmount: number;
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  onAddProject: (project: string) => string;
  onEntryUpdate: (entry: TimePropertyType) => void;
  onEntryRemove: (entry: TimeType | TimePropertyType) => void;
};

function TimeTable({
  entries,
  now,
  round,
  roundAmount,
  enabledNotes,
  enabledProjects,
  enabledEndDate,
  onEntryUpdate,
  onEntryRemove,
  onAddProject,
}: TimeTableType) {
  const [isMobile] = useResponsive({ max: 'tablet' });

  const Entries = entries.map(entry => (
    <Entry
      key={entry.id}
      round={round}
      roundAmount={roundAmount}
      entry={entry}
      now={now}
      enabledNotes={enabledNotes}
      enabledProjects={enabledProjects}
      enabledEndDate={enabledEndDate}
      onAddNewProject={onAddProject}
      onUpdate={onEntryUpdate}
      onRemove={onEntryRemove}
    />
  ));

  // only render Entries on mobile
  if (isMobile) {
    return Entries;
  }

  return (
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            {enabledEndDate ? 'Start date' : 'Date'}
          </Table.HeaderCell>
          <Table.HeaderCell>
            {enabledEndDate ? 'Start time' : 'Start'}
          </Table.HeaderCell>
          {enabledEndDate && (
            <Table.HeaderCell>
              End date
            </Table.HeaderCell>
          )}
          <Table.HeaderCell>
            {enabledEndDate ? 'End time' : 'End'}
          </Table.HeaderCell>
          <Table.HeaderCell>
            Duration
          </Table.HeaderCell>
          {enabledProjects && (
            <Table.HeaderCell>
              Project
            </Table.HeaderCell>
          )}
          {enabledNotes && (
            <Table.HeaderCell>
              Notes
            </Table.HeaderCell>
          )}
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Entries}
      </Table.Body>
    </Table>
  );
}

function mapStateToProps(state) {
  const roundingOn = getRoundingOn(state);

  return {
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
