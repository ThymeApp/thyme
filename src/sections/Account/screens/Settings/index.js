// @flow

import React, { Component } from 'react';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';

import Account from './Account';

class SettingsPage extends Component<*> {
  render() {
    return (
      <Container text className="AccountSettings">
        <Header as="h1">
          Account Settings
        </Header>
        <Account />
      </Container>
    );
  }
}

export default SettingsPage;
