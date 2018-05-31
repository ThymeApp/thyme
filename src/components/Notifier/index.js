// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

import './style.css';

type NotifierType = {
  updateAvailable: boolean;
}

class Notifier extends Component<NotifierType> {
  reloadWindow = () => window.location.reload();

  render() {
    const { updateAvailable } = this.props;

    if (!updateAvailable) {
      return null;
    }

    return (
      <div className="Notifier">
        <Message
          compact
          info
          onClick={this.reloadWindow}
        >
          <Icon name="refresh" />
          New version available. Refresh the page to load.
        </Message>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    updateAvailable: state.app.update,
  };
}

export default connect(mapStateToProps)(Notifier);
