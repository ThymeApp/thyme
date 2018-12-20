// @flow

import React from 'react';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

import './style.css';
import { valueFromEventTarget } from '../../core/dom';

type FieldRenderProps = {
  label: string;
  value: string;
  type: 'text' | 'password' | 'email';
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  error: string;
  onChange: (value: string) => void;
}

const FormField = ({
  label,
  type,
  value,
  placeholder,
  required = false,
  autoComplete = '',
  error,
  onChange,
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
        error={error}
        value={value}
        onChange={(e: Event) => onChange(valueFromEventTarget(e.target))}
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
