// @flow

import React from 'react';
import type { FieldProps } from 'redux-form';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

import './style.css';

type FieldRenderProps = {
  label: string;
  type: 'text' | 'password';
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
} & FieldProps;

const renderField = ({
  input,
  label,
  type,
  placeholder,
  required = false,
  autoComplete = '',
  meta: { touched, error, warning },
}: FieldRenderProps) => (
  <Form.Field required={required}>
    <label htmlFor="email">
      {label}
    </label>
    <div>
      <Input
        {...input}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        error={Boolean(touched && error)}
        size="small"
      />
      { touched && (
        (error && (
          <span className="Msg-Error">
            {error}
          </span>
        ))
        || (warning && (
          <span className="Msg-Warn">
            {warning}
          </span>
        ))
      ) }
    </div>
  </Form.Field>
);

export default renderField;
