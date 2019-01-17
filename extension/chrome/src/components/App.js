// @flow

import React, { Component } from 'react';
import { createStore } from 'redux';

import Entry from 'sections/TimeSheet/components/Entry/New';

import './App.css';
import { Provider } from 'react-redux';

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

  onStart = () => { console.log('start'); };

  onStop = () => { console.log('stop'); };

  onAdd = () => { console.log('add'); };

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

    if (!entry) {
      return <div>Connect to Thyme...</div>;
    }

    return (
      <Provider store={this.store}>
        <Entry />
      </Provider>
    );
  }
}

export default ExtensionApp;
