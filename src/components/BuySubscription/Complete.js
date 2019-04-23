// @flow

import React, { useCallback } from 'react';
import { Route, Switch } from 'react-router';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import { useMappedState } from 'core/useRedux';

import { hasPremium, isLoaded, isLoggedIn } from 'sections/Account/selectors';

import BuyButton from './Button';

function Complete() {
  const { showMessage } = useMappedState(useCallback(state => ({
    showMessage: !hasPremium(state) && isLoaded(state) && isLoggedIn(state),
  }), []));

  if (!showMessage) {
    return null;
  }

  return (
    <Message warning style={{ margin: '-1.5em 0 2em' }}>
      <Container
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ marginRight: 10 }}>
          Please complete your purchase of Thyme Premium.
        </div>

        <BuyButton>
          Finish Purchase
        </BuyButton>
      </Container>
    </Message>
  );
}

export default function CompletedOnRoute() {
  return (
    <Switch>
      <Route path="/premium" />
      <Route component={Complete} />
    </Switch>
  );
}
