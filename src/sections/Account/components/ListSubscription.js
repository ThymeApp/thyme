// @flow

import React, { useState, useCallback, useEffect } from 'react';

import format from 'date-fns/format';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import { useActions } from 'core/useActions';

import Loading from 'components/Loading';

import { alert } from 'actions/app';

import { getSubscriptions } from '../api';

function ListSubscription() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [subscriptions, setSubscriptions] = useState<SubscriptionInfo[]>([]);

  useEffect(() => {
    getSubscriptions()
      .then((result) => {
        setLoading(false);
        setSubscriptions(result);
      });
  }, []);

  const showAlert = useActions(alert);

  const onCancel = useCallback(() => {
    showAlert('Please send an email to support@usethyme.com and add that you would like to cancel your subscription.');
  }, [showAlert]);

  if (isLoading) {
    return <Loading noPadding size="medium" />;
  }

  if (subscriptions.length === 0) {
    return <Message error>Something went wrong, please try again later.</Message>;
  }

  return (
    <div>
      {subscriptions.map((plan: SubscriptionInfo) => (
        <div
          key={plan.plan}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p style={{ margin: 0 }}>
            Your Thyme Premium
            {` (in ${plan.plan}) `}
            will renew on
            {' '}
            {format(plan.periodEnd * 1000, 'MMMM D, YYYY')}
          </p>
          <Button basic onClick={onCancel}>
            cancel subscription
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ListSubscription;
