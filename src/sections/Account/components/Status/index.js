// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import type { Dispatch } from 'redux';

import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';

import parseJwt from 'core/jwt';
import { mergeImport, stateToExport } from 'core/importExport';
import type { toExportType } from 'core/importExport';

import { importJSONData } from 'actions/app';
import type { importDataType } from 'actions/app';

import { getDataToExport } from 'selectors/importExport';
import { isSyncing } from 'selectors/app';

import { logout, updateToken } from '../../actions';

import { getJwt } from '../../selectors';

import { refreshToken, getState } from '../../api';

import './Status.css';

type ConnectionStates = 'connected' | 'syncing' | 'offline';

type StatusProps = {
  exportState: toExportType;
  jwt: string;
  closePopup: () => void;
  onLogout: () => void;
  onUpdateToken: (token: string) => void;
  importData: (data: importDataType) => void;
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
    const { closePopup } = this.props;

    closePopup();

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

    const { exportState, importData } = this.props;

    getState().then((fromServer) => {
      const currentState = stateToExport(exportState);

      // check if the local state is up to date
      if (isEqual(currentState, fromServer)) {
        return;
      }

      // merge server state with current state
      const newState = mergeImport(currentState, fromServer);

      // save merged state to store
      importData(newState);
    });
  };

  goOnline = () => this.setState({ online: true });

  goOffline = () => this.setState({ online: false });

  timeout: TimeoutID;

  checkToken(): Promise<boolean> {
    // check again in 60 seconds
    this.timeout = setTimeout(() => this.checkToken(), 60000);

    const { jwt, onUpdateToken, onLogout } = this.props;

    const parsedJwt = parseJwt(jwt);
    const isOk = parsedJwt.exp && isBefore(new Date(), addDays(parsedJwt.exp * 1000, -7));

    // token is still okay to use
    if (isOk) {
      return Promise.resolve(true);
    }

    return refreshToken()
      .then((token) => {
        // save refreshed token
        onUpdateToken(token);

        return true;
      })
      .catch(() => {
        // token is invalid
        onLogout();

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
    exportState: getDataToExport(state),
    jwt: getJwt(state),
    connectionState: isSyncing(state) ? 'syncing' : 'connected',
  };
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    onLogout() {
      dispatch(logout());
    },
    onUpdateToken(token: string) {
      dispatch(updateToken(token));
    },
    importData(data: importDataType) {
      dispatch(importJSONData(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Status);
