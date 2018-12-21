// @flow

import React from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import { hasPremium, isLoaded } from 'sections/Account/selectors';

import BuyButton from './Button';

type CompleteProps = {
  showMessage: boolean;
};

function Complete({ showMessage }: CompleteProps) {
  if (!showMessage) {
    return null;
  }

  return (
    <Message warning style={{ margin: '-1.5em 0 2em' }}>
      <Container
        text
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

function mapStateToProps(state: StateShape) {
  return {
    showMessage: !hasPremium(state) && isLoaded(state),
  };
}

const EnhancedComplete = connect(mapStateToProps)(Complete);

export default function CompletedOnRoute() {
  return (
    <Switch>
      <Route path="/premium" />
      <Route component={EnhancedComplete} />
    </Switch>
  );
}
