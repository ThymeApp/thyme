// @flow
import React, { Component } from 'react';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import Login from './Login';
import Register from './Register';

import './style.css';

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

class Account extends Component<*, AccountState> {
  state = {
    isOpen: false,
    view: 'login',
  };

  handleOpen = () => this.setState({ isOpen: true });
  handleClose = () => this.setState({ isOpen: false });
  goToLogin = preventDefault(() => this.setState({ view: 'login' }));
  goToRegister = preventDefault(() => this.setState({ view: 'register' }));

  render() {
    const { isOpen, view } = this.state;

    return (
      <div>
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
      </div>
    );
  }
}

export default Account;
