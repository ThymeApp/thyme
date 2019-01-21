// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Entry from './Entry';

import './App.css';

type ExtensionAppProps = {
  registerOnMessage: (cb: (msg: any) => void) => void;
  postMessage: (msg: any) => void;
  onUpdateState: (state: StateShape) => void;
};

type ExtensionAppState = {
  entry?: TempTimePropertyType;
};

class ExtensionApp extends Component<ExtensionAppProps, ExtensionAppState> {
  state = {
    entry: undefined,
  };

  componentDidMount() {
    const { registerOnMessage } = this.props;

    registerOnMessage(msg => this.handleMessage(msg));
  }

  onUpdate = (newEntry: TimePropertyType) => {
    console.log('update');
  };

  onStart = () => {
    const { postMessage } = this.props;

    postMessage({ type: 'startTimer' });
  };

  onStop = () => {
    const { postMessage } = this.props;

    postMessage({ type: 'stopTimer' });
  };

  onAdd = () => { console.log('add'); };

  onAddProject = () => { console.log('add project'); };

  updateEntry = (entry: TempTimePropertyType) => {
    this.setState({ entry });
  };

  updateState = (state: StateShape) => {
    const { onUpdateState } = this.props;

    onUpdateState(state);
  };

  handleMessage = (msg: any) => {
    switch (msg.type) {
      case 'changeTimer':
        this.updateEntry(msg.entry);
        break;
      case 'changeState':
        this.updateState(msg.state);
        break;
      default:
        console.error('Unhandled message from background', msg);
    }
  };

  render() {
    const { entry } = this.state;

    return (
      <Entry
        entry={entry}
        onAdd={this.onAdd}
        onAddNewProject={this.onAddProject}
        onUpdate={this.onUpdate}
        onStart={this.onStart}
        onStop={this.onStop}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(state: StateShape) {
      dispatch({ type: 'UPDATE', state });
    },
  };
}

export default connect(null, mapDispatchToProps)(ExtensionApp);
