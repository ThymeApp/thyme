// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

import { updateAvailable } from '../../selectors/app';

import './style.css';

type NotifierType = {
  isUpdateAvailable: boolean;
}

class Notifier extends Component<NotifierType> {
  reloadWindow = () => window.location.reload();

  render() {
    const { isUpdateAvailable } = this.props;

    if (!isUpdateAvailable) {
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
    isUpdateAvailable: updateAvailable(state),
  };
}

export default connect(mapStateToProps)(Notifier);
