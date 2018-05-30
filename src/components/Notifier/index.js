// @flow

import React, { Component } from 'react';

import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

import './style.css';

class Notifier extends Component<*> {
  reloadWindow = () => window.location.reload();

  render() {
    return (
      <div className="Notifier">
        <Message
          compact
          info
          className="clickable"
          onClick={this.reloadWindow}
        >
          <Icon name="refresh" />
          New version available. Refresh the page to load.
        </Message>
      </div>
    );
  }
}

export default Notifier;
