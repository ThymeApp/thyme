// @flow

import React, { Component } from 'react';

import Entry from './Entry';

type ExtensionAppState = {
  entry?: TempTimePropertyType;
};

class ExtensionApp extends Component<*, ExtensionAppState> {
  state = {};

  componentDidMount() {
    const port = window.chrome.extension.connect();
    port.onMessage.addListener(this.handleMessage);
  }

  updateEntry = (entry: TempTimePropertyType) => {
    this.setState({ entry });
  };

  handleMessage = (msg: any) => {
    switch (msg.type) {
      case 'changeTimer':
        this.updateEntry(msg.entry);
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

    return <Entry entry={entry} />;
  }
}

export default ExtensionApp;
