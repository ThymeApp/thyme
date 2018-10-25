// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import type { Dispatch } from 'redux';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';

import { logout } from './actions';

import { isLoggedIn } from './selectors';

import Status from './components/Status';
import Login from './components/Login';
import Register from './components/Register';

import './Account.css';

type AccountProps = {
  history: RouterHistory;
  onLogout: () => void;
  loggedIn: boolean;
}

type AccountState = {
  isOpen: boolean;
  view: 'login' | 'register';
}

function preventDefault(cb: (e: Event) => void) {
  return (e: Event) => {
    e.preventDefault();
    cb(e);
  };
}

class Account extends Component<AccountProps, AccountState> {
  goToLogin = preventDefault(() => this.setState({ view: 'login' }));

  goToRegister = preventDefault(() => this.setState({ view: 'register' }));

  state = {
    isOpen: false,
    view: 'login',
  };

  onLogout = () => {
    const { onLogout } = this.props;

    onLogout();
  };

  handleOpen = () => this.setState({ isOpen: true });

  handleClose = () => this.setState({ isOpen: false });

  goToSettings = () => {
    const { history } = this.props;

    history.push('/settings');
    this.handleClose();
  };

  render() {
    const { loggedIn } = this.props;
    const { isOpen, view } = this.state;

    return (
      <Popup
        className="Account-PopUp"
        trigger={(
          <Button
            secondary={loggedIn}
            inverted={!loggedIn}
          >
            { loggedIn ? <Status closePopup={this.handleClose} /> : 'Log in to sync' }
          </Button>
        )}
        open={isOpen}
        position="bottom right"
        on="click"
        onClose={this.handleClose}
        onOpen={this.handleOpen}
      >
        { loggedIn ? (
          <Menu vertical>
            <Menu.Item
              name="settings"
              onClick={this.goToSettings}
            >
              Account settings
            </Menu.Item>
            <Menu.Item
              name="logout"
              onClick={this.onLogout}
            >
              Logout
            </Menu.Item>
          </Menu>
        ) : (
          <div className="Account-PopUp-Content">
            <Login
              inView={view === 'login'}
              goToRegister={this.goToRegister}
            />
            <Register
              inView={view === 'register'}
              goToLogin={this.goToLogin}
            />
          </div>
        )}
      </Popup>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: isLoggedIn(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    onLogout() {
      dispatch(logout());
    },
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Account);
