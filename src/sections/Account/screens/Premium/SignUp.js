// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { Formik } from 'formik';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import createValidation from 'core/validate';
import { trackPageview } from 'core/analytics';

import FormField from 'components/FormField/FormField';

import { loginAccount, registerAccount } from '../../actions';

import { login, registerUser } from '../../api';

import './Premium.css';

type PremiumProps = {
  onLoginAccount: (token: string) => void;
  onRegisterAccount: (token: string) => void;
}

type PremiumState = {
  page: 'register' | 'login';
};

class Premium extends Component<PremiumProps, PremiumState> {
  constructor() {
    super();

    this.state = {
      page: 'register',
    };
  }

  componentDidMount() {
    trackPageview('Premium / Sign up');
  }

  showLogin = () => this.setState({
    page: 'login',
  });

  showRegister = () => this.setState({
    page: 'register',
  });

  submitForm = (values, { setSubmitting, setStatus }) => {
    const { onLoginAccount, onRegisterAccount } = this.props;
    const { page } = this.state;

    return (page === 'login' ? login : registerUser)(values.email, values.password)
      .then((token) => {
        (page === 'login' ? onLoginAccount : onRegisterAccount)(token);
      })
      .catch((err) => {
        setSubmitting(false);
        setStatus({ error: err.message });
      });
  };

  validation() {
    const { page } = this.state;

    return {
      email: {
        required: 'Required field',
        email: 'Invalid email address',
      },
      password: {
        required: 'Required field',
      },
      ...(page === 'register' ? {
        password2: {
          required: 'Required field',
          matches: {
            field: 'password',
            error: 'Entered passwords do not match',
          },
        },
        agreed: {
          required: 'You need to agree with the terms in order to continue.',
        },
      } : {}),
    };
  }

  render() {
    const { page } = this.state;

    return (
      <Container text style={{ padding: '5em 0' }}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            password2: '',
            agreed: false,
          }}
          validate={createValidation(this.validation())}
          onSubmit={this.submitForm}
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
              loading={isSubmitting}
            >
              <Header as="h1">
                {page === 'register'
                  ? 'Sign Up For a Premium Thyme Account'
                  : 'Log in to get a Premium Thyme Account'}
              </Header>
              <p style={{ margin: '2em 0' }}>
                Start using the premium features of Thyme by signing up for an account. You will be
                able to start using Thyme and all its features right away!
              </p>

              {status && status.error && (
                <Message color="red" size="small">
                  {status.error}
                </Message>
              )}

              <FormField
                label="Email address"
                placeholder="Your email address"
                type="email"
                name="email"
                error={touched.email && errors.email}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Form.Group widths="equal">
                <FormField
                  label="Password"
                  placeholder="Your password"
                  type="password"
                  name="password"
                  error={touched.password && errors.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {page === 'register' ? (
                  <FormField
                    label="Confirm Password"
                    placeholder="Repeat password"
                    type="password"
                    name="password2"
                    error={touched.password2 && errors.password2}
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                ) : null}
              </Form.Group>
              {page === 'register' ? (
                <Form.Field>
                  <Checkbox
                    checked={values.agreed}
                    name="agreed"
                    onChange={(e, { name, checked }) => setFieldValue(name, checked)}
                    onBlur={handleBlur}
                    label={{
                      children: (
                        <span
                          className={touched.agreed && errors.agreed ? 'Msg-Error' : ''}
                          style={{ fontSize: '1.14285714rem' }}
                        >
                          I agree to the
                          {' '}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://usethyme.com/terms-of-use"
                          >
                            Terms and Conditions
                          </a>
                        </span>
                      ),
                    }}
                  />
                  {touched.agreed && errors.agreed && <div className="Msg-Error">{errors.agreed}</div>}
                </Form.Field>
              ) : null}
              <section className="Premium--Submit">
                <Button size="big" primary type="submit">
                  {page === 'register' ? 'Continue' : 'Log in' }
                </Button>
                <div>
                  {page === 'register' ? 'Already have an account?' : 'Do not have an account yet?' }
                  <Button
                    labelPosition="right"
                    basic
                    color="blue"
                    onClick={page === 'register' ? this.showLogin : this.showRegister}
                    content={page === 'register' ? 'Log in' : 'Create an account'}
                    type="button"
                  />
                </div>
              </section>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    onLoginAccount(token: string) {
      dispatch(loginAccount(token));
    },
    onRegisterAccount(token: string) {
      dispatch(registerAccount(token));
    },
  };
}

export default connect(null, mapDispatchToProps)(Premium);
