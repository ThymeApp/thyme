// @flow

import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { loadTemporaryItem } from 'core/localStorage';

import { addTime } from '../../actions';

import Entry from './Entry';

type NewProps = {
  now: Date,
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  onUpdateTempItem: (tracking: boolean, entry: TimePropertyType) => void;
  onResetTempItem: (entry: TimePropertyType) => void;
  onEntryCreate: (entry: TimePropertyType) => void;
  onAddNewProject: (project: string) => string;
};

function New({
  now,
  enabledNotes,
  enabledProjects,
  enabledEndDate,
  onEntryCreate,
  onAddNewProject,
  onUpdateTempItem,
  onResetTempItem,
}: NewProps) {
  return (
    <Entry
      round="none"
      now={now}
      enabledNotes={enabledNotes}
      enabledProjects={enabledProjects}
      enabledEndDate={enabledEndDate}
      tempEntry={loadTemporaryItem()}
      onAdd={onEntryCreate}
      onAddNewProject={onAddNewProject}
      onResetTempItem={onResetTempItem}
      onUpdateTempItem={onUpdateTempItem}
    />
  );
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    onEntryCreate(entry: TimePropertyType) {
      dispatch(addTime({
        ...entry,
        id: shortid.generate(),
      }));
    },
  };
}

export default connect(null, mapDispatchToProps)(New);
