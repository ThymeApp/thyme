// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import format from 'date-fns/format';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import Loading from 'components/Loading';

import { alert } from 'actions/app';

import { getSubscriptions } from '../api';

type ListSubscriptionProps = {
  showAlert: (message: string) => void;
};

type ListSubscriptionState = {
  subscriptions: SubscriptionInfo[];
  isLoading: boolean;
};

class ListSubscription extends Component<ListSubscriptionProps, ListSubscriptionState> {
  state = {
    subscriptions: [],
    isLoading: true,
  };

  componentDidMount() {
    getSubscriptions()
      .then((subscriptions) => {
        this.setState({
          subscriptions,
          isLoading: false,
        });
      });
  }

  onCancel = () => {
    const { showAlert } = this.props;

    showAlert('Please send an email to support@usethyme.com and add that you would like to cancel your subscription.');
  };

  render() {
    const { isLoading, subscriptions } = this.state;

    if (isLoading) {
      return <Loading />;
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
              {format(plan.periodEnd * 1000, 'MMMM d, YYYY')}
            </p>
            <Button basic onClick={this.onCancel}>
              cancel subscription
            </Button>
          </div>
        ))}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    showAlert(message: string) {
      dispatch(alert(message));
    },
  };
}

export default connect(null, mapDispatchToProps)(ListSubscription);
