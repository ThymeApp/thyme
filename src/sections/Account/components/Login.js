// @flow

import React, { Component } from 'react';
import classnames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import type { FormProps } from 'redux-form';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import renderField from 'components/FormField/renderField';

import { loginAccount } from '../actions';

import { login } from '../api';

type LoginProps = {
  onLoginAccount: (token: string) => void;
  goToRegister: (e: Event) => void;
} & FormProps;

class Login extends Component<LoginProps> {
  onSubmit = ({ email, password }) => login(email, password)
    .then((token) => {
      const { onLoginAccount } = this.props;

      onLoginAccount(token);
    })
    .catch((e) => {
      throw new SubmissionError({ _error: e.message });
    });

  render() {
    const {
      error,
      submitting,
      goToRegister,
      handleSubmit,
    } = this.props;

    return (
      <Form
        className={classnames('Login')}
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
          autoComplete="current-password"
          placeholder="Your password"
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

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    onLoginAccount(token: string) {
      dispatch(loginAccount(token));
    },
  };
}

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    form: 'login',
    validate,
  }),
)(Login);
