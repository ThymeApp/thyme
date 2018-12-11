// @flow

import React from 'react';
import { connect } from 'react-redux';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';

import { hasPremium, isLoggedIn } from '../../selectors';

import Subscribe from './Subscribe';
import SignUp from './SignUp';

import './Premium.css';

type PremiumProps = {
  isPremium: boolean;
  loggedIn: boolean;
}

function Premium({ isPremium, loggedIn }: PremiumProps) {
  if (isPremium) {
    return (
      <Container>
        Account page
      </Container>
    );
  }

  if (loggedIn) {
    return <Subscribe />;
  }

  return <SignUp />;
}

function mapStateToProps(state: StateShape) {
  return {
    isPremium: hasPremium(state),
    loggedIn: isLoggedIn(state),
  };
}

export default connect(mapStateToProps)(Premium);
