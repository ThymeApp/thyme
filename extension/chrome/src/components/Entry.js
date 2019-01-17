// @flow

import React from 'react';
import { connect } from 'react-redux';

import {
  getEnableEndDate,
  getEnableNotes,
  getEnableProjects,
} from 'sections/Settings/selectors';

import Entry from 'sections/TimeSheet/components/Entry/New';

type ExtensionEntryProps = {
  ready: boolean;
  entry: TempTimePropertyType;
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  onAdd: (entry: TimePropertyType) => void;
  onUpdate: (entry: TimePropertyType) => void;
  onAddNewProject: (project: string) => string;
};

function ExtensionEntry({
  ready,
  entry,
  enabledNotes,
  enabledProjects,
  enabledEndDate,
  onAdd,
  onAddNewProject,
  onUpdate,
}: ExtensionEntryProps) {
  if (!ready) {
    return <div>Waiting for state</div>;
  }

  return (
    <Entry
      round="none"
      now={new Date()}
      enabledNotes={enabledNotes}
      enabledProjects={enabledProjects}
      enabledEndDate={enabledEndDate}
      tempEntry={entry}
      onAdd={onAdd}
      onAddNewProject={onAddNewProject}
      onUpdateTempItem={onUpdate}
    />
  );
}

function mapStateToProps(state: StateShape) {
  if (!state.settings) {
    return {
      ready: false,
    };
  }

  return {
    ready: true,
    enabledNotes: getEnableNotes(state),
    enabledProjects: getEnableProjects(state),
    enabledEndDate: getEnableEndDate(state),
  };
}

export default connect(mapStateToProps)(ExtensionEntry);
