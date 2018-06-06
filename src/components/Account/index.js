// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import Status from './Status';
import Login from './Login';
import Register from './Register';

import './style.css';

type AccountProps = {
  jwt: string | null,
}

type AccountState = {
  isOpen: boolean,
  view: 'login' | 'register',
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

  handleOpen = () => this.setState({ isOpen: true });
  handleClose = () => this.setState({ isOpen: false });
  goToLogin = preventDefault(() => this.setState({ view: 'login' }));
  goToRegister = preventDefault(() => this.setState({ view: 'register' }));

  render() {
    const { jwt } = this.props;
    const { isOpen, view } = this.state;

    return (
      <div>
        {jwt && <Status />}
        {!jwt && (
          <Popup
            trigger={<Button inverted>Log in to sync</Button>}
            open={isOpen}
            position="bottom right"
            on="click"
            onClose={this.handleClose}
            onOpen={this.handleOpen}
          >
            <div className="Account-PopUp">
              <Login
                inView={view === 'login'}
                goToRegister={this.goToRegister}
              />
              <Register
                inView={view === 'register'}
                goToLogin={this.goToLogin}
              />
            </div>
          </Popup>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    jwt: state.account.jwt,
  };
}

export default connect(mapStateToProps)(Account);
