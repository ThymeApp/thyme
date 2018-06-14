// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';

import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';

import parseJwt from '../../core/jwt';
import { mergeImport, stateToExport } from '../../core/importExport';

import { logout, updateToken } from '../../actions/account';
import { importJSONData } from '../../actions/app';
import type { importDataType } from '../../actions/app';

import { refreshToken, getState } from './api';

import './Status.css';

type ConnectionStates = 'connected' | 'syncing' | 'offline';

type StatusProps = {
  state: storeShape;
  jwt: string;
  closePopup: () => void;
  updateToken: (token: string) => void;
  logout: () => void;
  importJSONData: (data: importDataType) => void;
  connectionState: ConnectionStates;
}

type StatusState = {
  online: boolean;
};

class Status extends Component<StatusProps, StatusState> {
  state = {
    online: navigator.onLine,
  };

  componentDidMount() {
    this.props.closePopup();

    this.checkToken().then(this.getStateFromServer);

    window.addEventListener('online', this.goOnline);
    window.addEventListener('offline', this.goOffline);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);

    window.removeEventListener('online', this.goOnline);
    window.removeEventListener('offline', this.goOffline);
  }

  getStateFromServer = (tokenValid: boolean) => {
    if (!tokenValid) {
      return;
    }

    const { state } = this.props;

    getState().then((fromServer) => {
      const currentState = stateToExport(state);

      // check if the local state is up to date
      if (isEqual(currentState, fromServer)) {
        return;
      }

      // merge server state with current state
      const newState = mergeImport(currentState, fromServer);

      // save merged state to store
      this.props.importJSONData(newState);
    });
  };

  goOnline = () => this.setState({ online: true });
  goOffline = () => this.setState({ online: false });

  timeout: TimeoutID;

  checkToken(): Promise<boolean> {
    // check again in 60 seconds
    this.timeout = setTimeout(() => this.checkToken(), 60000);

    const parsedJwt = parseJwt(this.props.jwt);
    const isOk = parsedJwt.iat && isBefore(new Date(), addDays(parsedJwt.iat * 1000, -7));

    // token is still okay to use
    if (isOk) {
      return Promise.resolve(true);
    }

    return refreshToken()
      .then((token) => {
        // save refreshed token
        this.props.updateToken(token);

        return true;
      })
      .catch(() => {
        // token is invalid
        this.props.logout();

        return false;
      });
  }

  render() {
    const { connectionState } = this.props;
    const { online } = this.state;

    const status: ConnectionStates = online ? connectionState : 'offline';

    return (
      <div className={classnames('Status', `Status--${status}`)}>
        {online ? 'connected' : 'offline'}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
    jwt: state.account.jwt,
    connectionState: state.app.syncing ? 'syncing' : 'connected',
  };
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators({ logout, updateToken, importJSONData }, dispatch),
)(Status);
