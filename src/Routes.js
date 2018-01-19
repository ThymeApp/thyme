// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Time from './pages/Time';
import Projects from './pages/Projects';
import Settings from './pages/Settings';

function Routes() {
  return (
    <Switch>
      <Route path="/projects" component={Projects} />
      <Route path="/settings" component={Settings} />
      <Route exact path="/" component={Time} />
    </Switch>
  );
}

export default Routes;
