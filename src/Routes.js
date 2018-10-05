// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Time from './sections/Time';
import Reports from './sections/Reports';
import Projects from './sections/Projects';
import Settings from './sections/Settings';

function Routes() {
  return (
    <Switch>
      <Route path="/reports/:reportId?" component={Reports} />
      <Route path="/projects" component={Projects} />
      <Route path="/settings" component={Settings} />
      <Route exact path="/" component={Time} />
    </Switch>
  );
}

export default Routes;
