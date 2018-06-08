// @flow
import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import type { FormProps } from 'redux-form';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import renderField from '../FormField/renderField';

import { registerAccount } from '../../actions/account';

import { registerUser as regiserUserOnApi } from './api';

type RegisterProps = {
  inView: boolean;
  goToLogin: (e: Event) => void;
} & FormProps;

class Register extends Component<RegisterProps> {
  onSubmit = ({ email, password }) => regiserUserOnApi(email, password)
    .then((result) => {
      this.props.registerAccount(result);
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
        { error && <Message color="red" size="small">{ error }</Message> }

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

export default compose(
  connect(null, dispatch => bindActionCreators({ registerAccount }, dispatch)),
  reduxForm({
    form: 'register',
    validate,
  }),
)(Register);
