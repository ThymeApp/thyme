// @flow

import React from 'react';
import { connect } from 'react-redux';

import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import Loading from 'components/Loading';
import BuySubscription from 'components/BuySubscription';

import { hasPremium, isLoaded } from '../../selectors';

import ListSubscription from '../../components/ListSubscription';

type SubscriptionProps = {
  isPremium: boolean;
  isLoading: boolean;
};

function Subscription({ isPremium, isLoading }: SubscriptionProps) {
  if (isLoading) {
    return (
      <Loading />
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
        <BuySubscription />
      </div>
    );
  }

  return <ListSubscription />;
}

function mapStateToProps(state: StateShape) {
  return {
    isPremium: hasPremium(state),
    isLoading: !isLoaded(state),
  };
}

export default connect(mapStateToProps)(Subscription);
