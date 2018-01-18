// @flow

import React from 'react';
import type { Element } from 'react';
import { Switch, Route } from 'react-router-dom';

import Projects from './pages/Projects';
import Time from './pages/Time';

function Routes(): Element<any> {
  return (
    <Switch>
      <Route path="/projects" component={Projects} />
      <Route exact path="/" component={Time} />
    </Switch>
  );
}

export default Routes;
