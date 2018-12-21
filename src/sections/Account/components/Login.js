// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import createValidation from 'core/validate';

import FormField from 'components/FormField/FormField';

import { loginAccount } from '../actions';

import { login } from '../api';

type LoginProps = {
  onLoginAccount: (token: string) => void;
  goToRegister: (e: Event) => void;
};

class Login extends Component<LoginProps> {
  validation = createValidation({
    email: {
      required: 'Required field',
      email: 'Invalid email address',
    },
    password: {
      required: 'Required field',
    },
  });

  onSubmit = (values, { setSubmitting, setStatus }) => login(values.email, values.password)
    .then((token) => {
      const { onLoginAccount } = this.props;

      onLoginAccount(token);
    })
    .catch((err) => {
      setSubmitting(false);
      setStatus({ error: err.message });
    });

  render() {
    const { goToRegister } = this.props;

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={this.validation}
        onSubmit={this.onSubmit}
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
        }) => (
          <Form
            className="Login"
            noValidate
            size="large"
            onSubmit={handleSubmit}
            loading={isSubmitting}
          >
            {status && status.error && (
              <Message color="red" size="small">
                {status.error}
              </Message>
            )}

            <FormField
              label="Email address"
              placeholder="Your email address"
              type="email"
              autoComplete="username email"
              name="email"
              error={touched.email && errors.email}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <FormField
              label="Password"
              placeholder="Your password"
              type="password"
              autoComplete="current-password"
              name="password"
              error={touched.password && errors.password}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
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
        )}
      </Formik>
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
