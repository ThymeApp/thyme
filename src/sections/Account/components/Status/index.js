// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

import { isSyncing } from 'selectors/app';

import { hasPremium } from '../../selectors';

import './Status.css';

type ConnectionStates = 'connected' | 'syncing' | 'offline';

type StatusProps = {
  closePopup: () => void;
  connectionState: ConnectionStates;
  isPremium: boolean;
}

type StatusState = {
  online: boolean;
};

class Status extends Component<StatusProps, StatusState> {
  state = {
    online: navigator.onLine,
  };

  componentDidMount() {
    const { closePopup } = this.props;

    closePopup();

    window.addEventListener('online', this.goOnline);
    window.addEventListener('offline', this.goOffline);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);

    window.removeEventListener('online', this.goOnline);
    window.removeEventListener('offline', this.goOffline);
  }

  goOnline = () => this.setState({ online: true });

  goOffline = () => this.setState({ online: false });

  timeout: TimeoutID;

  render() {
    const { connectionState, isPremium } = this.props;
    const { online } = this.state;

    const status: ConnectionStates = online ? connectionState : 'offline';

    return (
      <div className={classnames('Status', `Status--${status}`)}>
        {online ? 'connected' : 'offline'}
        {isPremium ? <Icon name="diamond" size="small" /> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    connectionState: isSyncing(state) ? 'syncing' : 'connected',
    isPremium: hasPremium(state),
  };
}

export default connect(mapStateToProps)(Status);
