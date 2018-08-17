// @flow

import React from 'react';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';

import Account from '../components/Settings/Account';
import ImportExport from '../components/Settings/ImportExport';
import DeleteData from '../components/Settings/DeleteData';
import Rounding from '../components/Settings/Rounding';

function Settings() {
  return (
    <Container>
      <Header as="h1">
        Settings
      </Header>

      <Account />
      <ImportExport />
      <DeleteData />
      <Rounding />

      <Header as="h3">
        About
      </Header>

      <p>
        Thyme is a creation by&nbsp;
        <a href="https://theclevernode.com">
          Gaya Kessler
        </a>
        .
        It is&nbsp;
        <a href="https://github.com/Gaya/thyme">
          open source
        </a>
        &nbsp;and free to use.
        All your data is stored in your own browser.
        Issues / requests can be&nbsp;
        <a href="https://github.com/Gaya/thyme/issues">
          filed on Github
        </a>
        .
      </p>
    </Container>
  );
}

export default Settings;
