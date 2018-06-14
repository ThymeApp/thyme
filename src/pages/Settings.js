// @flow

import React from 'react';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';

import Account from '../components/Settings/Account';
import ImportExport from '../components/Settings/ImportExport';
import DeleteData from '../components/Settings/DeleteData';

function Settings() {
  return (
    <Container>
      <Header as="h1">Settings</Header>

      <Account />
      <ImportExport />
      <DeleteData />

      <Header as="h3">About</Header>
      Thyme is a creation by <a href="https://theclevernode.com">Gaya Kessler</a>.
      It is <a href="https://github.com/Gaya/thyme">open source</a> and free to use.
      All your data is stored in your own browser.
      Issues / requests can be <a href="https://github.com/Gaya/thyme/issues">filed on Github</a>.
    </Container>
  );
}

export default Settings;
