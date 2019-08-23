// @flow

import React, { useMemo, useCallback } from 'react';
import { Formik } from 'formik';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import createValidation from 'core/validate';
import { useActions } from 'core/useActions';

import { alert } from 'actions/app';

import FormField from 'components/FormField/FormField';

import { changePassword } from '../../api';

function Account() {
  const showAlert = useActions(alert);

  const validation = useMemo(
    () => createValidation({
      currentPassword: { required: 'Required field' },
      password: { required: 'Required field' },
      confirmPassword: {
        required: 'Required field',
        matches: {
          field: 'password',
          error: 'Entered passwords do not match',
        },
      },
    }),
    [],
  );

  const onSubmit = useCallback(
    (
      { currentPassword, password },
      { setSubmitting, setStatus, resetForm },
    ) => changePassword(currentPassword, password)
      .then(() => {
        showAlert('Password successfully updated');

        setSubmitting(false);
        setStatus();
        resetForm();
      })
      .catch((e) => {
        setSubmitting(false);
        setStatus({ error: e.message });
      }),
    [showAlert],
  );

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        password: '',
        confirmPassword: '',
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

export default Account;
