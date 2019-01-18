// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Entry from './Entry';

import './App.css';

type ExtensionAppProps = {
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
    const port = window.chrome.extension.connect();
    port.onMessage.addListener(this.handleMessage);
  }

  onUpdate = () => { console.log('update entry'); };

  onStart = () => { console.log('start'); };

  onStop = () => { console.log('stop'); };

  onAdd = () => { console.log('add'); };

  onAddProject = () => { console.log('add project'); };

  updateEntry = (entry: TempTimePropertyType) => {
    console.log(entry);

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
