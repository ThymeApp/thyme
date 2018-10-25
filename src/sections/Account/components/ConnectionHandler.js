// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import type { Dispatch } from 'redux';

import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';

import { mergeImport, stateToExport } from 'core/importExport';
import parseJwt from 'core/jwt';
import type { toExportType } from 'core/importExport';

import { importJSONData } from 'actions/app';
import type { importDataType } from 'actions/app';

import { getDataToExport } from 'selectors/importExport';

import { getState, refreshToken } from '../api';
import { getJwt } from '../selectors';
import { logout, updateToken } from '../actions';

type ConnectionHandlerProps = {
  exportState: toExportType;
  jwt: string | null;
  children: any;
  onLogout: () => void;
  onUpdateToken: (token: string) => void;
  importData: (data: importDataType) => void;
};

class ConnectionHandler extends Component<ConnectionHandlerProps> {
  componentDidMount() {
    this.checkToken().then(this.getStateFromServer);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
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

  timeout: TimeoutID;

  checkToken(): Promise<boolean> {
    const { jwt, onUpdateToken, onLogout } = this.props;

    if (!jwt) {
      return Promise.resolve(false);
    }

    // check again in 60 seconds
    this.timeout = setTimeout(() => this.checkToken(), 60000);

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
    const { children } = this.props;

    return children;
  }
}

function mapStateToProps(state) {
  return {
    exportState: getDataToExport(state),
    jwt: getJwt(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionHandler);
