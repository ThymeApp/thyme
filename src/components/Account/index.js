// @flow
import React, { Component } from 'react';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import Login from './Login';

import './style.css';

type AccountState = {
  isOpen: boolean,
}

class Account extends Component<*, AccountState> {
  state = { isOpen: false };

  handleOpen = () => this.setState({ isOpen: true });
  handleClose = () => this.setState({ isOpen: false });

  render() {
    const { isOpen } = this.state;

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
          <Login />
        </Popup>
      </div>
    );
  }
}

export default Account;
