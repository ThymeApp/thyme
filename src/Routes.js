// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TimeSheet from 'sections/TimeSheet';
import Projects from 'sections/Projects';
import Settings from 'sections/Settings';
import Reports from 'sections/Reports';
import Account from 'sections/Account';

function Routes() {
  return (
    <Switch>
      <Route path="/(premium|account)" component={Account} />
      <Route path="/projects" component={Projects} />
      <Route path="/settings/:page?" component={Settings} />
      <Route path="/reports/:reportId?" component={Reports} />
      <Route exact path="/" component={TimeSheet} />
    </Switch>
  );
}

export default Routes;
