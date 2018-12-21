// @flow

import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import FormField from 'components/FormField/FormField';

import { loginAccount } from '../actions';

import { login } from '../api';

type LoginProps = {
  onLoginAccount: (token: string) => void;
  goToRegister: (e: Event) => void;
};

type LoginState = {
  values: {
    email: string;
    password: string;
  };
  submitting: boolean;
  errors: { [key: string]: string };
  apiError: string;
};

class Login extends Component<LoginProps, LoginState> {
  state = {
    values: {
      email: '',
      password: '',
    },
    submitting: false,
    errors: {},
    apiError: '',
  };

  onUpdateValue = (field: string) => (value: string) => { // eslint-disable-line
    const { values } = this.state;

    this.setState({
      values: {
        ...values,
        [field]: value,
      },
    });
  };

  updateEmail = this.onUpdateValue('email');

  updatePassword = this.onUpdateValue('password');

  onSubmit = (e: Event) => {
    e.preventDefault();

    const { values } = this.state;

    this.setState({
      submitting: true,
      apiError: '',
      errors: {},
    });

    const errors = this.validate();

    if (Object.keys(errors).length > 0) {
      return this.setState({
        submitting: false,
        errors,
      });
    }

    return login(values.email, values.password)
      .then((token) => {
        const { onLoginAccount } = this.props;

        onLoginAccount(token);
      })
      .catch((err) => {
        this.setState({
          submitting: false,
          apiError: err.message,
        });
      });
  };

  validate() {
    const { values } = this.state;

    const errors = {};
    const required = 'Required field';

    if (!values.email) {
      errors.email = required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = required;
    }

    return errors;
  }

  render() {
    const { goToRegister } = this.props;

    const {
      values,
      errors,
      submitting,
      apiError,
    } = this.state;

    const { email, password } = values;

    return (
      <Form
        className={classnames('Login')}
        loading={submitting}
        onSubmit={this.onSubmit}
        noValidate
      >
        {apiError && (
          <Message color="red" size="small">
            {apiError}
          </Message>
        )}

        <FormField
          label="Email address"
          placeholder="Your email address"
          type="email"
          error={errors.email}
          value={email}
          autoComplete="username email"
          onChange={this.updateEmail}
        />

        <FormField
          label="Password"
          placeholder="Your password"
          type="password"
          error={errors.password}
          value={password}
          autoComplete="current-password"
          onChange={this.updatePassword}
        />

        <section className="Account__Submit-Bar">
          <Form.Button primary fluid>
            Log in
          </Form.Button>
        </section>

        <section className="Account__Sub-Bar">
          Do not have an account?

          <Button
            labelPosition="right"
            basic
            color="blue"
            onClick={goToRegister}
            content="Register"
          />
        </section>
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    onLoginAccount(token: string) {
      dispatch(loginAccount(token));
    },
  };
}

export default connect(null, mapDispatchToProps)(Login);
