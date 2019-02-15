// @flow

import React from 'react';
import { connect } from 'react-redux';

import isSameDay from 'date-fns/is_same_day';

import Label from 'semantic-ui-react/dist/commonjs/elements/Label';

import { timeElapsed } from 'core/thyme';
import { formatTime, formatDate } from 'core/intl';
import { treeDisplayName } from 'core/projects';

import { sortedProjects } from 'sections/Projects/selectors';

import './ListEntry.css';

type ListEntryProps = {
  entry: TimeType;
  project: ProjectTreeWithTimeType;
  enabledNotes: boolean;
  enabledProjects: boolean;
  round: Rounding;
  roundAmount: number;
};

function ListEntry(props: ListEntryProps) {
  const {
    entry,
    project,
    round,
    roundAmount,
    enabledNotes,
    enabledProjects,
  } = props;
  const {
    start,
    end,
    notes,
  } = entry;

  const duration = timeElapsed(start, end, false, false, round, roundAmount);
  const showDates = !isSameDay(start, end);

  return (
    <div className="ListEntry">
      {enabledNotes && (
        <div className="ListEntry__Notes">
          {notes}
        </div>
      )}
      {enabledProjects && project && (
        <div className="ListEntry__Project">
          <Label>
            {treeDisplayName(project)}
          </Label>
        </div>
      )}
      <div className="ListEntry__Time">
        {showDates && <span className="ListEntry__DateValue">{formatDate(start)}</span>}
        <span className="ListEntry__TimeValue">{formatTime(start)}</span>
        <span className="ListEntry__TimeSeparator">→</span>
        {showDates && <span className="ListEntry__DateValue">{formatDate(end)}</span>}
        <span className="ListEntry__TimeValue">{formatTime(end)}</span>
      </div>
      <div className="ListEntry__Duration">
        {duration}
      </div>
    </div>
  );
}

function mapStateToProps(state: StateShape, ownProps: ListEntryProps) {
  const projects = sortedProjects(state);
  const project = projects.find(item => item.id === ownProps.entry.project);

  return {
    project,
  };
}

export default connect(mapStateToProps)(ListEntry);
