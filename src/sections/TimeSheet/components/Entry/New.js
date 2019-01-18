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
  onInit: (tracking: boolean, entry: TimePropertyType) => void;
  onUpdateItem: (entry: TimePropertyType, tracking: boolean) => void;
  onResetItem: (entry: TimePropertyType) => void;
  onEntryCreate: (entry: TimePropertyType) => void;
  onAddNewProject: (project: string) => string;
};

function New({
  now,
  enabledNotes,
  enabledProjects,
  enabledEndDate,
  onInit,
  onEntryCreate,
  onAddNewProject,
  onUpdateItem,
  onResetItem,
}: NewProps) {
  return (
    <Entry
      round="none"
      now={now}
      enabledNotes={enabledNotes}
      enabledProjects={enabledProjects}
      enabledEndDate={enabledEndDate}
      tempEntry={loadTemporaryItem()}
      onInit={onInit}
      onAdd={onEntryCreate}
      onAddNewProject={onAddNewProject}
      onResetItem={onResetItem}
      onUpdate={onUpdateItem}
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
