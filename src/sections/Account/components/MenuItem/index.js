// @flow

import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';

import addDays from 'date-fns/add_days';
import format from 'date-fns/format';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';

import { logout } from '../../actions';

import { isLoggedIn, hasPremium, isLoaded } from '../../selectors';

import Status from '../Status';
import Login from '../Login';
import Register from '../Register';

import './MenuItem.css';

type AccountProps = {
  history: RouterHistory;
  onLogout: () => void;
  loggedIn: boolean;
  showPremium: boolean;
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

    history.push('/account');
    this.handleClose();
  };

  goToPremium = () => {
    const { history } = this.props;

    history.push('/premium');
    this.handleClose();
  };

  render() {
    const { loggedIn, showPremium } = this.props;
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
            {showPremium && (
              <Menu.Item name="premium" className="Account-BackUp">
                Only timesheet data from
                {' '}
                <strong>
                  {format(addDays(new Date(), -31), 'MMM D, YYYY')}
                </strong>
                {' '}
                onwards will be backed up.

                <Button primary onClick={this.goToPremium}>
                  <Icon name="diamond" />
                  Buy Unlimited Backups
                </Button>
              </Menu.Item>
            )}
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
    showPremium: !hasPremium(state) && isLoaded(state),
  };
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
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
