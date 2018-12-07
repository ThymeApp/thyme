// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Premium from './screens/Premium';

export default function AccountRoutes() {
  return (
    <Switch>
      <Route path="/premium" component={Premium} />
    </Switch>
  );
}
