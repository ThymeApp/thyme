// @flow

import React from 'react';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

import './style.css';

type FieldRenderProps = {
  label: string;
  value: string;
  name: string;
  type: 'text' | 'password' | 'email';
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  error: string;
  onChange: () => void;
  onBlur: () => void;
}

const FormField = ({
  label,
  name,
  type,
  value,
  placeholder,
  required = false,
  autoComplete = '',
  error,
  onChange,
  onBlur,
}: FieldRenderProps) => (
  <Form.Field required={required}>
    <label htmlFor="email">
      {label}
    </label>
    <div>
      <Input
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        error={!!error}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        size="small"
      />
      {error && (
        <span className="Msg-Error">
          {error}
        </span>
      )}
    </div>
  </Form.Field>
);

export default FormField;
