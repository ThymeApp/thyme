// @flow

import React from 'react';
import { connect } from 'react-redux';

import Loading from 'components/Loading';

import { hasPremium, isLoggedIn, isLoaded } from '../../selectors';

import Subscribe from './Subscribe';
import SignUp from './SignUp';
import Completed from './Completed';

import './Premium.css';

type PremiumProps = {
  isPremium: boolean;
  loggedIn: boolean;
  loadingDone: boolean;
}

function Premium({ loadingDone, isPremium, loggedIn }: PremiumProps) {
  if (loggedIn && !loadingDone) {
    return <Loading />;
  }

  if (isPremium) {
    return <Completed />;
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
    loadingDone: isLoaded(state),
  };
}

export default connect(mapStateToProps)(Premium);
