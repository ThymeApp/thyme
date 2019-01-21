// @flow

import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { clearTemporaryItem, loadTemporaryItem, saveTemporaryItem } from 'core/localStorage';
import { changeTimer } from 'core/extensions/events';

import { addTime } from '../../actions';

import Entry from './Entry';

type NewProps = {
  now: Date,
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  onEntryCreate: (entry: TimePropertyType) => void;
  onAddNewProject: (project: string) => string;
};

const onUpdateItem = (entry: TimePropertyType, tracking: boolean) => {
  const timer = { ...entry, tracking };

  // communicate to extensions
  changeTimer(timer);

  // save temporary state to localStorage
  saveTemporaryItem(timer);
};

const onResetItem = (entry: TimePropertyType) => {
  // communicate change of timer
  changeTimer({ tracking: false, ...entry });

  // clear item from localStorage
  clearTemporaryItem();
};

const onInit = (tracking: boolean, entry: TimePropertyType) => {
  changeTimer({ tracking, ...entry });
};

function New({
  now,
  enabledNotes,
  enabledProjects,
  enabledEndDate,
  onEntryCreate,
  onAddNewProject,
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
