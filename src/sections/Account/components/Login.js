// @flow

import React, { useCallback } from 'react';
import { Formik } from 'formik';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
// import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import createValidation from 'core/validate';
import { useActions } from 'core/useActions';

import FormField from 'components/FormField/FormField';

import { loginAccount } from '../actions';

import { login } from '../api';

const validation = createValidation({
  email: {
    required: 'Required field',
    email: 'Invalid email address',
  },
  password: {
    required: 'Required field',
  },
});

// type LoginProps = {
//   goToRegister: (e: Event) => void;
// };

function Login() { // { goToRegister }: LoginProps
  const onLoginAccount = useActions(loginAccount);

  const onSubmit = useCallback(
    (values, { setSubmitting, setStatus }) => login(values.email, values.password)
      .then((token) => {
        onLoginAccount(token);
      })
      .catch((err) => {
        setSubmitting(false);
        setStatus({ error: err.message });
      }),
    [onLoginAccount],
  );

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={validation}
      onSubmit={onSubmit}
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

          {/* <section className="Account__Sub-Bar"> */}
          {/*  Do not have an account? */}

          {/*  <Button */}
          {/*    labelPosition="right" */}
          {/*    basic */}
          {/*    color="blue" */}
          {/*    onClick={goToRegister} */}
          {/*    content="Register" */}
          {/*  /> */}
          {/* </section> */}
        </Form>
      )}
    </Formik>
  );
}

export default Login;
