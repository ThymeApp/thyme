// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TimeSheet from 'sections/TimeSheet';
import Projects from 'sections/Projects';
import Settings from 'sections/Settings';
import Reports from 'sections/Reports';

function Routes() {
  return (
    <Switch>
      <Route path="/projects" component={Projects} />
      <Route path="/settings" component={Settings} />
      <Route path="/reports/:reportId?" component={Reports} />
      <Route exact path="/" component={TimeSheet} />
    </Switch>
  );
}

export default Routes;
