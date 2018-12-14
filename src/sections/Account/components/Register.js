// @flow
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import type { FormProps } from 'redux-form';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import renderField from 'components/FormField/renderField';

import { registerAccount } from '../actions';

import { registerUser as registerUserOnApi } from '../api';

type RegisterProps = {
  inView: boolean;
  goToLogin: (e: Event) => void;
  onRegisterAccount: (token: string) => void;
} & FormProps;

class Register extends Component<RegisterProps> {
  onSubmit = ({ email, password }) => registerUserOnApi(email, password)
    .then((token) => {
      const { onRegisterAccount } = this.props;

      onRegisterAccount(token);
    })
    .catch((e) => {
      throw new SubmissionError({ _error: e.message });
    });

  render() {
    const {
      inView,
      error,
      submitting,
      goToLogin,
      handleSubmit,
    } = this.props;

    return (
      <Form
        className={classnames('Register', { 'Register--visible': inView })}
        loading={submitting}
        onSubmit={handleSubmit(this.onSubmit)}
        noValidate
      >
        {error && (
          <Message color="red" size="small">
            {error}
          </Message>
        )}

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
          <Form.Button primary fluid>
            Register
          </Form.Button>
        </section>

        <section className="Account__Sub-Bar">
          Already have an account?

          <Button
            labelPosition="right"
            basic
            color="blue"
            onClick={goToLogin}
            content="Log in"
          />
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

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    onRegisterAccount(token: string) {
      dispatch(registerAccount(token));
    },
  };
}

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    form: 'register',
    validate,
  }),
)(Register);
