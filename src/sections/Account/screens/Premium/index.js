// @flow

import React from 'react';

import { useMappedState } from 'core/useRedux';

import Loading from 'components/Loading';

import { hasPremium, isLoggedIn, isLoaded } from '../../selectors';

import Subscribe from './Subscribe';
import SignUp from './SignUp';
import Completed from './Completed';

import './Premium.css';

function Premium() {
  const { loadingDone, isPremium, loggedIn } = useMappedState(state => ({
    isPremium: hasPremium(state),
    loggedIn: isLoggedIn(state),
    loadingDone: isLoaded(state),
  }));

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

export default Premium;
