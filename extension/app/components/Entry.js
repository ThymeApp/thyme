// @flow

import React from 'react';
import { connect } from 'react-redux';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import {
  getEnableEndDate,
  getEnableNotes,
  getEnableProjects,
} from 'sections/Settings/selectors';

import EditableEntry from 'sections/TimeSheet/components/Entry/EditableEntry';

type ExtensionEntryProps = {
  ready: boolean;
  entry: TempTimePropertyType;
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  onAdd: (entry: TimePropertyType) => void;
  onUpdate: (entry: TimePropertyType, tracking: boolean) => void;
  onStart: () => void;
  onStop: () => void;
  openThyme: () => void;
};

function ExtensionEntry({
  ready,
  entry,
  enabledNotes,
  enabledProjects,
  enabledEndDate,
  onAdd,
  onUpdate,
  onStart,
  onStop,
  openThyme,
}: ExtensionEntryProps) {
  if (!entry || !ready) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1em 0.5em',
        }}
      >
        <Header>You need to have Thyme running</Header>
        <Button primary onClick={openThyme}>Open Thyme in new tab</Button>
      </div>
    );
  }

  return (
    <EditableEntry
      round="none"
      entry={entry}
      isNew
      tracking={entry.tracking}
      now={new Date()}
      enabledNotes={enabledNotes}
      enabledProjects={enabledProjects}
      enabledEndDate={enabledEndDate}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onStart={onStart}
      onStop={onStop}
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
