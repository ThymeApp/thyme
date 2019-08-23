// @flow

import React from 'react';
import { useSelector } from 'react-redux';

import Loading from 'components/Loading';

import { hasPremium, isLoggedIn, isLoaded } from '../../selectors';

import Subscribe from './Subscribe';
import SignUp from './SignUp';
import Completed from './Completed';

import './Premium.css';

const selectors = (state) => ({
  isPremium: hasPremium(state),
  loggedIn: isLoggedIn(state),
  loadingDone: isLoaded(state),
});

function Premium() {
  const { loadingDone, isPremium, loggedIn } = useSelector(selectors);

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
