import React, { Component } from 'react';

function renderEntry(entry) {
  const duration = (entry.end - entry.start) / 1000;

  const hours = Math.floor(duration / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((duration / 60) % 60).toString().padStart(2, '0');
  const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
}

class ExtensionApp extends Component {
  state = {
    entry: null,
  };

  componentDidMount() {
    const port = chrome.extension.connect();
    port.onMessage.addListener(this.handleMessage);
  }

  updateEntry = (entry) => {
    console.log(entry);

    this.setState({ entry });
  };

  handleMessage = (msg) => {
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

    console.log(entry);

    return <div>Dit is de extension yo</div>;
  }
}

export default ExtensionApp;
