// @flow

import React, { Component } from 'react';
import { StripeProvider, Elements, CardElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { Formik } from 'formik';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import { trackPageview } from 'core/analytics';
import createValidation from 'core/validate';

import FormField from 'components/FormField/FormField';

import { buySubscription } from '../../api';

import { updateAccountInformation } from '../../actions';

import countries from './countries';

const countryOptions = countries.map((country) => ({ ...country, value: country.key }));

type SubscribeProps = {
  fetchAccountInformation: () => void;
};

type SubscribeState = {
  stripe: any | null;
  cardInput: any | null;
};

class Subscribe extends Component<SubscribeProps, SubscribeState> {
  validation = createValidation(
    ['name', 'address', 'postalCode', 'city', 'country']
      .reduce((acc, key) => ({
        ...acc,
        [key]: { required: 'Required field' },
      }), {}),
  );

  constructor() {
    super();

    this.state = {
      stripe: null,
      cardInput: null,
    };
  }

  componentDidMount() {
    const stripeJs = document.createElement('script');
    stripeJs.src = 'https://js.stripe.com/v3/';
    stripeJs.async = true;
    stripeJs.onload = () => this.setState({
      stripe: window.Stripe(process.env.REACT_APP_STRIPE_KEY),
    });

    if (document.body) document.body.appendChild(stripeJs);

    trackPageview('Premium / Subscribe');
  }

  handleSubmit = (values, { setSubmitting, setStatus, setFieldError }) => {
    const { stripe, cardInput } = this.state;
    const { fetchAccountInformation } = this.props;

    if (stripe) {
      stripe
        .createToken(cardInput)
        .then((response) => {
          if (response.error) {
            setFieldError('card', response.error.message);
          }

          if (response.token) {
            return buySubscription(response.token.id, values);
          }

          return setSubmitting(false);
        })
        .then((success) => {
          if (success) {
            fetchAccountInformation();
          }
        })
        .catch((err) => {
          setSubmitting(false);
          setStatus({ error: err.message });
        });
    }
  };

  setCardInput = (StripeElement: any) => this.setState({ cardInput: StripeElement });

  render() {
    const { stripe } = this.state;

    return (
      <Container text style={{ padding: '5em 0' }}>
        <Header as="h1">Subscribe to Thyme Premium</Header>

        <StripeProvider stripe={stripe}>
          <Elements>
            <Formik
              initialValues={{
                payIn: 'EUR',
                name: '',
                address: '',
                postalCode: '',
                city: '',
                country: '',
              }}
              validate={this.validation}
              onSubmit={this.handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                status,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
                <Form
                  noValidate
                  onSubmit={handleSubmit}
                  size="large"
                  loading={isSubmitting || !stripe}
                >
                  <p>
                    To complete your subscription order please enter the information below.
                  </p>

                  <Header as="h3" attached="top">Billing Address</Header>
                  <Segment size="large" attached>
                    <p>
                      Your billing address is required for tax purposes.
                    </p>
                    <FormField
                      label="Name"
                      placeholder="Your full name"
                      type="text"
                      name="name"
                      error={touched.name && errors.name}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormField
                      label="Address"
                      placeholder="Your address"
                      type="text"
                      name="address"
                      error={touched.address && errors.address}
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Form.Group widths="equal">
                      <FormField
                        label="Postal Code"
                        placeholder="ZIP or Postal Code"
                        type="text"
                        name="postalCode"
                        error={touched.postalCode && errors.postalCode}
                        value={values.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormField
                        label="City"
                        placeholder="City"
                        type="text"
                        name="city"
                        error={touched.city && errors.city}
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                    <Form.Field>
                      <label>Country</label>
                      <Dropdown
                        placeholder="Select country"
                        fluid
                        search
                        selection
                        options={countryOptions}
                        name="country"
                        error={Boolean(touched.country && errors.country)}
                        value={values.country}
                        onChange={(e, { name, value }) => setFieldValue(name, value)}
                        onBlur={handleBlur}
                      />
                      {touched.country && errors.country && (
                        <div className="Msg-Error">{errors.country}</div>
                      )}
                    </Form.Field>
                  </Segment>

                  <Header as="h3" attached="top">Payment</Header>
                  <Segment size="large" attached>
                    <Form.Group grouped>
                      <label>Pay in:</label>
                      <Form.Radio
                        label="€ EUR"
                        value="EUR"
                        name="payIn"
                        checked={values.payIn === 'EUR'}
                        onChange={(e, { name, value }) => setFieldValue(name, value)}
                        onBlur={handleBlur}
                      />
                      <Form.Radio
                        label="$ USD"
                        value="USD"
                        name="payIn"
                        checked={values.payIn === 'USD'}
                        onChange={(e, { name, value }) => setFieldValue(name, value)}
                        onBlur={handleBlur}
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
                    {`You will be charged ${values.payIn === 'EUR' ? '€10' : '$12'} every month.`}
                  </Message>

                  {status && status.error && (
                    <Message color="red">
                      {status.error}
                    </Message>
                  )}

                  <Button size="big" primary type="submit">
                    Complete Purchase
                  </Button>
                </Form>
              )}
            </Formik>
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
