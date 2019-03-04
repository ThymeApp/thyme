// @flow

import React from 'react';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';

import { useTrackPageview } from 'core/analytics';

import Account from './Account';
import Subscription from './Subscription';

function SettingsPage() {
  useTrackPageview('Account Settings');

  return (
    <Container text className="AccountSettings">
      <Header as="h1">
        Account Settings
      </Header>
      <Segment style={{ marginTop: '2em' }}>
        <Header as="h3">
          Change Password
        </Header>
        <Account />
      </Segment>
      <Segment style={{ marginTop: '2em' }}>
        <Header as="h3">
          Subscription Status
        </Header>
        <Subscription />
      </Segment>
    </Container>
  );
}

export default SettingsPage;
