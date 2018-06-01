// @flow
import React, { Component } from 'react';
import classnames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import renderField from '../FormField/renderField';

type RegisterProps = {
  inView: boolean;
  goToLogin: (e: Event) => void;
} & FormProps;

type RegisterState = {
  isLoading: boolean;
};

class Register extends Component<RegisterProps, RegisterState> {
  state = {
    isLoading: false,
  };

  onSubmit = () => {
    this.setState({ isLoading: true });
  };

  render() {
    const { isLoading } = this.state;
    const { inView, goToLogin, handleSubmit } = this.props;

    return (
      <Form
        className={classnames('Register', { 'Register--visible': inView })}
        loading={isLoading}
        onSubmit={handleSubmit(this.onSubmit)}
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
          autoComplete="off"
          placeholder="Enter a password"
        />

        <Field
          label="Confirm password"
          name="confirmPassword"
          required
          component={renderField}
          type="password"
          autoComplete="off"
          placeholder="Confirm your password"
        />

        <section className="Account__Submit-Bar">
          <Form.Button primary>Register</Form.Button>
          or
          <Button
            basic
            onClick={goToLogin}
          >
            Log in
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

  if (!values.confirmPassword) {
    errors.confirmPassword = required;
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Entered password do not match';
  }

  return errors;
};

export default reduxForm({
  form: 'register',
  validate,
})(Register);
