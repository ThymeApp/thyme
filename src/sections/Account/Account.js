// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Premium from './screens/Premium';
import Settings from './screens/Settings';

export default function AccountRoutes() {
  return (
    <Switch>
      <Route path="/premium" component={Premium} />
      <Route path="/account" component={Settings} />
    </Switch>
  );
}
