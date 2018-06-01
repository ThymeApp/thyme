// @flow
import React, { Component } from 'react';
import classnames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import renderField from '../FormField/renderField';

type LoginProps = {
  inView: boolean;
  goToRegister: (e: Event) => void;
} & FormProps;

type LoginState = {
  isLoading: boolean;
};

class Login extends Component<LoginProps, LoginState> {
  state = { isLoading: false };

  onSubmit = () => {
    this.setState({ isLoading: true });
  };

  render() {
    const { isLoading } = this.state;
    const {
      inView,
      goToRegister,
      handleSubmit,
    } = this.props;

    return (
      <Form
        className={classnames('Login', { 'Login--visible': inView })}
        loading={isLoading}
        onSubmit={handleSubmit(this.onSubmit)}
        noValidate
      >
        <Field
          label="Email address"
          name="email"
          required
          component={renderField}
          type="email"
          autoComplete="username email"
          placeholder="Your email address"
        />

        <Field
          label="Password"
          name="password"
          required
          component={renderField}
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
        />

        <section className="Account__Submit-Bar">
          <Form.Button primary>Login</Form.Button>
          or
          <Button
            basic
            onClick={goToRegister}
          >
            Register
          </Button>
        </section>
      </Form>
    );
  }
}

const validate = (values) => {
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
};

export default reduxForm({
  form: 'login',
  validate,
})(Login);
