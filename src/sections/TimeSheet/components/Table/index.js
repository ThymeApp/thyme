// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table';

import Responsive from 'components/Responsive';

import {
  getDurationRounding,
  getDurationAmount,
  getRoundingOn,
  getEnableNotes,
  getEnableProjects,
  getEnableEndDate,
} from 'sections/Settings/selectors';

import { addProject } from 'sections/Projects/actions';

import { updateTime, removeTime } from '../../actions';

import { getDateSort } from '../../selectors';

import { NewEntry, Entry } from '../Entry';

type TimeTableType = {
  sort: SortDirection;
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
  sort,
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
  const New = (
    <NewEntry
      now={now}
      enabledNotes={enabledNotes}
      enabledProjects={enabledProjects}
      enabledEndDate={enabledEndDate}
      onAddNewProject={onAddProject}
    />
  );

  const Entries = (
    <Fragment>
      {sort === 'desc' && New}
      {entries.map(entry => (
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
      ))}
      {sort === 'asc' && New}
    </Fragment>
  );

  const TableContent = (
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

  return (
    <Responsive max="tablet">
      {matched => (matched ? Entries : TableContent)}
    </Responsive>
  );
}

function mapStateToProps(state) {
  const roundingOn = getRoundingOn(state);

  return {
    sort: getDateSort(state),
    round: roundingOn === 'entries' ? getDurationRounding(state) : 'none',
    roundAmount: roundingOn === 'entries' ? getDurationAmount(state) : 0,
    enabledNotes: getEnableNotes(state),
    enabledProjects: getEnableProjects(state),
    enabledEndDate: getEnableEndDate(state),
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
    onAddProject(project, entry) {
      const newProjectAction = addProject({ parent: null, name: project });

      const projectId = newProjectAction.id;

      dispatch(newProjectAction);
      dispatch(updateTime({ ...entry, project: projectId }));

      return newProjectAction.id;
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);
