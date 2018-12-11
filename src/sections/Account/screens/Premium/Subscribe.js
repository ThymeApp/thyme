// @flow

import React, { Component } from 'react';
import { StripeProvider, Elements, CardElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import { valueFromEventTarget } from 'core/dom';

import { buySubscription } from '../../api';

import { updateAccountInformation } from '../../actions';

import countries from './countries';

const countryOptions = countries.map(country => ({ ...country, value: country.key }));

type SubscribeProps = {
  fetchAccountInformation: () => void;
};

type SubscribeState = {
  stripe: any | null;
  cardInput: any | null;
  submitting: boolean;
  values: {
    payIn: 'EUR' | 'USD';
    name: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
  };
  errors: { [key: string]: string };
  apiError: string;
};

class Subscribe extends Component<SubscribeProps, SubscribeState> {
  state = {
    submitting: false,
    stripe: null,
    cardInput: null,
    values: {
      payIn: 'EUR',
      name: '',
      address: '',
      postalCode: '',
      city: '',
      country: '',
    },
    errors: {},
    apiError: '',
  };

  componentDidMount() {
    const stripeJs = document.createElement('script');
    stripeJs.src = 'https://js.stripe.com/v3/';
    stripeJs.async = true;
    stripeJs.onload = () => this.setState({
      stripe: window.Stripe(process.env.REACT_APP_STRIPE_KEY),
    });

    if (document.body) document.body.appendChild(stripeJs);
  }

  onUpdateValue = (field: string) => (e: Event) => { // eslint-disable-line
    const { values } = this.state;

    this.setState({
      values: {
        ...values,
        [field]: valueFromEventTarget(e.target),
      },
    });
  };

  onChange = {
    name: this.onUpdateValue('name'),
    address: this.onUpdateValue('address'),
    postalCode: this.onUpdateValue('postalCode'),
    city: this.onUpdateValue('city'),
  };

  handlePayInChange = (e: Event, { value }: any) => {
    const { values } = this.state;
    this.setState({ values: { ...values, payIn: value } });
  };

  handleCountryChange = (e: Event, { value }: any) => {
    const { values } = this.state;
    this.setState({ values: { ...values, country: value } });
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();

    const { stripe, cardInput, values } = this.state;
    const { fetchAccountInformation } = this.props;

    const errors = this.validateForm();

    this.setState({
      submitting: true,
    });

    if (stripe) {
      stripe
        .createToken(cardInput)
        .then((response) => {
          if (response.error) {
            errors.card = response.error.message;
          }

          if (Object.keys(errors).length > 0) {
            return this.setState({
              submitting: false,
              errors,
            });
          }

          if (response.token) {
            return buySubscription(response.token.id, values);
          }

          this.setState({
            submitting: false,
          });

          return false;
        })
        .then((success) => {
          if (success) {
            fetchAccountInformation();
          }
        })
        .catch((err) => {
          this.setState({
            submitting: false,
            apiError: err.message,
          });
        });
    }
  };

  setCardInput = (StripeElement: any) => this.setState({ cardInput: StripeElement });

  validateForm(): { [key: string]: string } {
    const { values } = this.state;

    const fields = ['name', 'address', 'postalCode', 'city', 'country'];

    return fields
      .filter(key => values[key].trim().length === 0)
      .reduce((acc, key) => ({ ...acc, [key]: 'Required field' }), {});
  }

  render() {
    const {
      stripe,
      values,
      submitting,
      errors,
      apiError,
    } = this.state;

    const {
      payIn,
      name,
      address,
      postalCode,
      city,
      country,
    } = values;

    return (
      <Container text style={{ padding: '5em 0' }}>
        <Header as="h1">Subscribe to Thyme Premium</Header>

        <StripeProvider stripe={stripe}>
          <Elements>
            <Form loading={submitting || !stripe} size="large" onSubmit={this.handleSubmit}>
              <p>
                To complete your subscription order please enter the information below.
              </p>

              <Header as="h3" attached="top">Billing Address</Header>
              <Segment size="large" attached>
                <p>
                  Your billing address is required for tax purposes.
                </p>
                <Form.Field>
                  <label>Name</label>
                  <Input
                    placeholder="Your full name"
                    value={name}
                    onChange={this.onChange.name}
                    error={!!errors.name}
                  />
                  {errors.name && <div className="Msg-Error">{errors.name}</div>}
                </Form.Field>
                <Form.Field>
                  <label>Address</label>
                  <Input
                    placeholder="Your address"
                    value={address}
                    onChange={this.onChange.address}
                    error={!!errors.address}
                  />
                  {errors.address && <div className="Msg-Error">{errors.address}</div>}
                </Form.Field>
                <Form.Group widths="equal">
                  <Form.Field>
                    <label>Postal Code</label>
                    <Input
                      placeholder="ZIP or Postal Code"
                      value={postalCode}
                      onChange={this.onChange.postalCode}
                      error={!!errors.postalCode}
                    />
                    {errors.postalCode && <div className="Msg-Error">{errors.postalCode}</div>}
                  </Form.Field>
                  <Form.Field>
                    <label>City</label>
                    <Input
                      placeholder="City"
                      value={city}
                      onChange={this.onChange.city}
                      error={!!errors.city}
                    />
                    {errors.city && <div className="Msg-Error">{errors.city}</div>}
                  </Form.Field>
                </Form.Group>
                <Form.Field>
                  <label>Country</label>
                  <Dropdown
                    placeholder="Select country"
                    fluid
                    search
                    selection
                    value={country}
                    onChange={this.handleCountryChange}
                    options={countryOptions}
                    error={!!errors.country}
                  />
                  {errors.country && <div className="Msg-Error">{errors.country}</div>}
                </Form.Field>
              </Segment>

              <Header as="h3" attached="top">Payment</Header>
              <Segment size="large" attached>
                <Form.Group grouped>
                  <label>Pay in:</label>
                  <Form.Radio
                    label="€ EUR"
                    value="EUR"
                    checked={payIn === 'EUR'}
                    onChange={this.handlePayInChange}
                  />
                  <Form.Radio
                    label="$ USD"
                    value="USD"
                    checked={payIn === 'USD'}
                    onChange={this.handlePayInChange}
                  />
                </Form.Group>
                <Form.Group grouped>
                  <label>Card information:</label>
                  <div className="StripeContainer">
                    <CardElement
                      style={{ base: { fontSize: '17px' } }}
                      onReady={this.setCardInput}
                    />
                  </div>
                  {errors.card && <div className="Msg-Error">{errors.card}</div>}
                </Form.Group>
              </Segment>
              <Message attached="bottom">
                {`You will be charged ${payIn === 'EUR' ? '€10' : '$12'} every month.`}
              </Message>

              {apiError && (
                <Message color="red">
                  {apiError}
                </Message>
              )}

              <Button size="big" primary type="submit">
                Complete Purchase
              </Button>
            </Form>
          </Elements>
        </StripeProvider>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    fetchAccountInformation() {
      dispatch(updateAccountInformation());
    },
  };
}

export default connect(null, mapDispatchToProps)(Subscribe);
