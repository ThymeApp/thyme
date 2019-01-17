// @flow

import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Entry from './Entry';

import './App.css';

type ExtensionAppState = {
  entry?: TempTimePropertyType;
};

class ExtensionApp extends Component<*, ExtensionAppState> {
  state = {
    entry: undefined,
  };

  store = createStore((state: StateShape = {}, action: any) => (
    action.type === 'UPDATE' ? action.state : state
  ));

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
    this.setState({ entry });
  };

  updateState = (state: StateShape) => {
    this.store.dispatch({ type: 'UPDATE', state });
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
      <Provider store={this.store}>
        <Entry
          entry={entry}
          onAdd={this.onAdd}
          onAddNewProject={this.onAddProject}
          onUpdateTempItem={this.onUpdate}
        />
      </Provider>
    );
  }
}

export default ExtensionApp;
