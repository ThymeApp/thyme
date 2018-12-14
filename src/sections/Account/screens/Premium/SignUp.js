// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import { valueFromEventTarget } from 'core/dom';

import { loginAccount, registerAccount } from '../../actions';

import { login, registerUser } from '../../api';

import './Premium.css';

type PremiumProps = {
  onLoginAccount: (token: string) => void;
  onRegisterAccount: (token: string) => void;
}

type PremiumState = {
  page: 'register' | 'login';
  values: {
    email: string;
    password: string;
    password2: string;
    agreed: boolean;
  };
  errors: {
    [field: string]: string;
  };
  apiError: string;
  submitting: boolean;
};

class Premium extends Component<PremiumProps, PremiumState> {
  state = {
    page: 'register',
    values: {
      email: '',
      password: '',
      password2: '',
      agreed: false,
    },
    errors: {},
    apiError: '',
    submitting: false,
  };

  onUpdateValue = (field: string) => (e: Event) => { // eslint-disable-line
    const { values } = this.state;

    this.setState({
      values: {
        ...values,
        [field]: valueFromEventTarget(e.target),
      },
    });
  };

  onUpdateAgreed = () => {
    const { values } = this.state;

    this.setState({
      values: {
        ...values,
        agreed: !values.agreed,
      },
    });
  };

  updateEmail = this.onUpdateValue('email');

  updatePassword = this.onUpdateValue('password');

  updatePassword2 = this.onUpdateValue('password2');

  resetValues() {
    const { values } = this.state;

    return {
      ...values,
      password: '',
      password2: '',
      agreed: false,
    };
  }

  showLogin = () => this.setState({
    page: 'login',
    values: this.resetValues(),
  });

  showRegister = () => this.setState({
    page: 'register',
    values: this.resetValues(),
  });

  validateForm() {
    const { values, page } = this.state;

    const errors = {};

    if (!values.email || values.email.trim().length < 1) {
      errors.email = 'Required field';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password || values.password.trim().length < 1) {
      errors.password = 'Required field';
    }

    if (page === 'register') {
      if (!values.password2 || values.password2.trim().length < 1) {
        errors.password2 = 'Required field';
      } else if (values.password !== values.password2) {
        errors.password = 'Entered passwords do not match';
        errors.password2 = ' ';
      }

      if (!values.agreed) {
        errors.agreed = 'Required field';
      }
    }

    return errors;
  }

  submitForm = (e: Event) => {
    e.preventDefault();

    const { onLoginAccount, onRegisterAccount } = this.props;
    const { values, page } = this.state;

    this.setState({
      submitting: true,
      apiError: '',
    });

    const errors = this.validateForm();

    if (Object.keys(errors).length > 0) {
      return this.setState({
        submitting: false,
        errors,
      });
    }

    return (page === 'login' ? login : registerUser)(values.email, values.password)
      .then((token) => {
        (page === 'login' ? onLoginAccount : onRegisterAccount)(token);

        this.setState({ submitting: false });
      })
      .catch((err) => {
        this.setState({
          submitting: false,
          apiError: err.message,
        });
      });
  };

  render() {
    const {
      page,
      values,
      submitting,
      errors,
      apiError,
    } = this.state;

    const {
      email,
      password,
      password2,
      agreed,
    } = values;

    return (
      <Container text style={{ padding: '5em 0' }}>
        <Form
          noValidate
          onSubmit={this.submitForm}
          size="large"
          loading={submitting}
        >
          <Header as="h1">
            {page === 'register'
              ? 'Sign Up For a Premium Thyme Account'
              : 'Log in to get a Premium Thyme Account'
            }
          </Header>
          <p style={{ margin: '2em 0' }}>
            Start using the premium features of Thyme by signing up for an account. You will be able
            to start using Thyme and all its features right away!
          </p>

          {apiError && (
            <Message color="red" size="small">
              {apiError}
            </Message>
          )}

          <Form.Field>
            <label>Email address</label>
            <Input
              fluid
              placeholder="Your email address"
              type="email"
              error={!!errors.email}
              value={email}
              onChange={this.updateEmail}
            />
            {errors.email && <div className="Msg-Error">{errors.email}</div>}
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Password</label>
              <Input
                fluid
                placeholder="Your password"
                type="password"
                error={!!errors.password}
                value={password}
                onChange={this.updatePassword}
              />
              {errors.password && <div className="Msg-Error">{errors.password}</div>}
            </Form.Field>
            {page === 'register' ? (
              <Form.Field>
                <label>Confirm Password</label>
                <Input
                  fluid
                  placeholder="Repeat password"
                  type="password"
                  error={!!errors.password2}
                  value={password2}
                  onChange={this.updatePassword2}
                />
                {errors.password2 && <div className="Msg-Error">{errors.password2}</div>}
              </Form.Field>
            ) : null}
          </Form.Group>
          {page === 'register' ? (
            <Form.Field>
              <Checkbox
                checked={agreed}
                onChange={this.onUpdateAgreed}
                label={{
                  children: (
                    <span
                      className={errors.agreed ? 'Msg-Error' : ''}
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
              {errors.agreed && <div className="Msg-Error">{errors.agreed}</div>}
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
