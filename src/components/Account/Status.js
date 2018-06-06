// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';

import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';

import parseJwt from '../../core/jwt';

import { logout, updateToken } from '../../actions/account';

import { refreshToken } from './api';

import './Status.css';

type ConnectionStates = 'connected' | 'syncing' | 'offline';

type StatusProps = {
  updateToken: (token: string) => void;
  logout: () => void;
  jwt: string;
  connectionState: ConnectionStates;
}

class Status extends Component<StatusProps> {
  componentDidMount() {
    this.checkToken();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  timeout: TimeoutID;

  checkToken() {
    // check again in 60 seconds
    this.timeout = setTimeout(() => this.checkToken(), 60000);

    const parsedJwt = parseJwt(this.props.jwt);
    const isOk = isBefore(new Date(), addDays(parsedJwt.iat * 1000, 1));

    // token is still okay to use
    if (isOk) {
      return;
    }

    refreshToken()
      .then((token) => {
        // save refreshed token
        this.props.updateToken(token);
      })
      .catch(() => {
        // token is invalid
        this.props.logout();
      });
  }

  render() {
    const { connectionState } = this.props;

    return (
      <div className={classnames('Status', `Status--${connectionState}`)}>
        {connectionState}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    jwt: state.account.jwt,
    connectionState: state.app.syncing ? 'syncing' : 'connected',
  };
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators({ logout, updateToken }, dispatch),
)(Status);
