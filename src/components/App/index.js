// @flow

import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Container, Image, Menu, Message } from 'semantic-ui-react';
import classnames from 'classnames';

import thyme from './Thyme.svg';
import './App.css';
import './print.css';

function AppLink(name, path, currentPath) {
  return (
    <Link
      className={classnames('item', { active: currentPath === path })}
      to={path}
    >
      {name}
    </Link>
  );
}

type AppType = {
  location: RouterLocation,
  children: any
}

function App({ location, children }: AppType) {
  const { host } = window.location;
  const wrongLocation = !host.match(/usethyme\.com/) && !host.match(/localhost/);

  return (
    <div className="App">
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <Image size="mini" src={thyme} alt="Thyme" style={{ width: 24, marginRight: '1.5em' }} />
            Thyme
          </Menu.Item>
          {AppLink('Timesheet', '/', location.pathname)}
          {AppLink('Reports', '/reports', location.pathname)}
          {AppLink('Projects', '/projects', location.pathname)}
          {AppLink('Settings', '/settings', location.pathname)}
        </Container>
      </Menu>
      <Container fluid style={{ marginTop: '5em' }}>
        {wrongLocation && (
          <Message warning style={{ margin: 50 }}>
            <Message.Header>Thyme changed locations</Message.Header>
            <p>
              This version of Thyme will no longer be updated. Please{' '}
              <strong>export your data</strong> on the settings page and use:{' '}
              <a href="https://usethyme.com">https://usethyme.com</a>.
            </p>
          </Message>
        )}
        {children}
      </Container>
    </div>
  );
}

export default withRouter(App);
