// @flow

import React from 'react';

import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import { useMappedState } from 'core/useRedux';

import Loading from 'components/Loading';
import Button from 'components/BuySubscription/Button';

import { hasPremium, isLoaded } from '../../selectors';

import ListSubscription from '../../components/ListSubscription';

function Subscription() {
  const { isPremium, isLoading } = useMappedState(state => ({
    isPremium: hasPremium(state),
    isLoading: !isLoaded(state),
  }));

  if (isLoading) {
    return (
      <Loading noPadding size="medium" />
    );
  }

  if (!isPremium) {
    return (
      <div>
        <Message>
          <p>
            You do not have an active subscription to Thyme. Buy a subscription now and enjoy
            premium features.
          </p>
          <p>
            Read more about
            <a href="https://usethyme.com/premium/"> Thyme Premium </a>
            on the website.
          </p>
        </Message>
        <Button />
      </div>
    );
  }

  return <ListSubscription />;
}

export default Subscription;
