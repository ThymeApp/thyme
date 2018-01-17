import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Switch, Route, Link } from 'react-router-dom';
import classnames from 'classnames';

import Time from '../../pages/Time';
import Projects from '../../pages/Projects';

import './App.css';

function AppLink(name, path, currentPath) {
  return (
    <Link
      className={classnames('App__menu-item', { 'App__menu-item--active': currentPath === path  })}
      to={path}
    >
      {name}
    </Link>
  );
}

class App extends Component {
  render() {
    const { location } = this.props;

    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Thyme</h1>

          <menu className="App__menu">
            {AppLink('Timesheet', '/', location.pathname)}
            {AppLink('Projects', '/projects', location.pathname)}
          </menu>
        </header>
        <section className="App__container">
          <Switch>
            <Route path="/projects" component={Projects} />
            <Route exact path="/" component={Time} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
