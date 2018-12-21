// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import createValidation from 'core/validate';

import { alert } from 'actions/app';

import FormField from 'components/FormField/FormField';

import { changePassword } from '../../api';

type AccountProps = {
  showAlert: (message: string) => void;
};

class Account extends Component<AccountProps> {
  validation = createValidation({
    currentPassword: { required: 'Required field' },
    password: { required: 'Required field' },
    confirmPassword: {
      required: 'Required field',
      matches: {
        field: 'password',
        error: 'Entered passwords do not match',
      },
    },
  });

  onSubmit = (
    { currentPassword, password },
    { setSubmitting, setStatus, resetForm },
  ) => changePassword(currentPassword, password)
    .then(() => {
      const { showAlert } = this.props;

      showAlert('Password successfully updated');

      setSubmitting(false);
      setStatus();
      resetForm();
    })
    .catch((e) => {
      setSubmitting(false);
      setStatus({ error: e.message });
    });

  render() {
    return (
      <Formik
        initialValues={{
          currentPassword: '',
          password: '',
          confirmPassword: '',
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
            onSubmit={handleSubmit}
            loading={isSubmitting}
            noValidate
          >
            {status && status.error && (
              <Message color="red" size="small">
                {status.error}
              </Message>
            )}

            <FormField
              label="Current password"
              placeholder="Your current password"
              type="password"
              name="currentPassword"
              autoComplete="off"
              error={touched.currentPassword && errors.currentPassword}
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <FormField
              label="New password"
              placeholder="Enter a new password"
              type="password"
              name="password"
              autoComplete="off"
              error={touched.password && errors.password}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <FormField
              label="Confirm new password"
              placeholder="Confirm your new password"
              type="password"
              name="confirmPassword"
              autoComplete="off"
              error={touched.confirmPassword && errors.confirmPassword}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Form.Button primary type="submit">
              Update password
            </Form.Button>
          </Form>
        )}
      </Formik>
    );
  }
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    showAlert(message: string) {
      dispatch(alert(message));
    },
  };
}

export default connect(null, mapDispatchToProps)(Account);
