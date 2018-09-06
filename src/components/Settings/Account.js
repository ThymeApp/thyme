// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import {
  Field,
  reduxForm,
  SubmissionError,
  initialize,
} from 'redux-form';
import type { FormProps } from 'redux-form';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import { alert } from '../../actions/app';

import renderField from '../FormField/renderField';

import { changePassword } from './api';

type AccountProps = {
  showAlert: (message: string) => void;
  initializeForms: (form: string, data: any) => void;
} & FormProps;

class Account extends Component<AccountProps> {
  onSubmit = ({ currentPassword, password }) => changePassword(currentPassword, password)
    .then(() => {
      const { showAlert, initializeForms } = this.props;

      showAlert('Password successfully updated');
      initializeForms('accountSettings', {});
    })
    .catch((e) => {
      throw new SubmissionError({ _error: e.message });
    });

  render() {
    const {
      submitting,
      error,
      handleSubmit,
    } = this.props;

    return (
      <Fragment>
        <Header as="h3">
          Account settings
        </Header>

        <Form
          onSubmit={handleSubmit(this.onSubmit)}
          loading={submitting}
          noValidate
        >
          {error && (
            <Message color="red" size="small">
              {error}
            </Message>
          )}

          <Field
            label="Current password"
            name="currentPassword"
            required
            component={renderField}
            type="password"
            autoComplete="off"
            placeholder="Your current password"
          />

          <Field
            label="New password"
            name="password"
            required
            component={renderField}
            type="password"
            autoComplete="off"
            placeholder="Enter a new password"
          />

          <Field
            label="Confirm new password"
            name="confirmPassword"
            required
            component={renderField}
            type="password"
            autoComplete="off"
            placeholder="Confirm your new password"
          />

          <Form.Button primary>
            Update password
          </Form.Button>
        </Form>
      </Fragment>
    );
  }
}

const validate = (values) => {
  const errors = {};
  const required = 'Required field';

  if (!values.currentPassword) {
    errors.currentPassword = required;
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
  connect(
    null,
    dispatch => bindActionCreators({
      initializeForms: initialize,
      showAlert: alert,
    }, dispatch),
  ),
  reduxForm({
    form: 'accountSettings',
    validate,
  }),
)(Account);
