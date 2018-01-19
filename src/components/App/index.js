// @flow

import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import thyme from './Thyme.svg';

import './App.css';

function AppLink(name, path, currentPath) {
  return (
    <Link
      className={classnames('App__menu-item', { 'App__menu-item--active': currentPath === path })}
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
  return (
    <div className="App">
      <header className="App__header">
        <h1 className="App__title">
          <img src={thyme} alt="Thyme" />
          Thyme
        </h1>

        <menu className="App__menu">
          {AppLink('Timesheet', '/', location.pathname)}
          {AppLink('Reports', '/reports', location.pathname)}
          {AppLink('Projects', '/projects', location.pathname)}
          {AppLink('Settings', '/settings', location.pathname)}
        </menu>
      </header>
      <section className="App__container">{children}</section>
    </div>
  );
}

export default withRouter(App);
