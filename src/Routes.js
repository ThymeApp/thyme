// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loading from './components/Loading';

const TimeSheet = Loadable({
  loader: () => import('./sections/TimeSheet'),
  loading: Loading,
});

const Reports = Loadable({
  loader: () => import('./sections/Reports'),
  loading: Loading,
});

const Projects = Loadable({
  loader: () => import('./sections/Projects'),
  loading: Loading,
});

const Settings = Loadable({
  loader: () => import('./sections/Settings'),
  loading: Loading,
});

function Routes() {
  return (
    <Switch>
      <Route path="/reports/:reportId?" component={Reports} />
      <Route path="/projects" component={Projects} />
      <Route path="/settings" component={Settings} />
      <Route exact path="/" component={TimeSheet} />
    </Switch>
  );
}

export default Routes;
