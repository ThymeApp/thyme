// @flow

import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

type BuySubscriptionProps = {
  children?: string;
};

function BuySubscription({ children }: BuySubscriptionProps) {
  return (
    <Button as={Link} primary to="/premium">
      <Icon name="diamond" />
      {children || 'Buy Subscription'}
    </Button>
  );
}

export default BuySubscription;
