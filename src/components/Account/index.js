// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';

import { logout } from '../../actions/account';

import Status from './Status';
import Login from './Login';
import Register from './Register';

import './style.css';

type AccountProps = {
  history: RouterHistory;
  logout: () => void;
  jwt: string | null;
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
  state = {
    isOpen: false,
    view: 'login',
  };

  onLogout = () => this.props.logout();
  handleOpen = () => this.setState({ isOpen: true });
  handleClose = () => this.setState({ isOpen: false });

  goToLogin = preventDefault(() => this.setState({ view: 'login' }));
  goToRegister = preventDefault(() => this.setState({ view: 'register' }));
  goToSettings = () => {
    this.props.history.push('/settings');
    this.handleClose();
  };

  render() {
    const { jwt } = this.props;
    const { isOpen, view } = this.state;

    return (

      <Popup
        className="Account-PopUp"
        trigger={(
          <Button
            secondary={!!jwt}
            inverted={!jwt}
          >
            { jwt ? <Status closePopup={this.handleClose} /> : 'Log in to sync' }
          </Button>
        )}
        open={isOpen}
        position="bottom right"
        on="click"
        onClose={this.handleClose}
        onOpen={this.handleOpen}
      >
        { jwt ? (
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
    jwt: state.account.jwt,
  };
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    dispatch => bindActionCreators({ logout }, dispatch),
  ),
)(Account);
