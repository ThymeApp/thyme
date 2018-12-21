// @flow

type ValidateType = {
  [fieldName: string]: {
    required?: string;
    email?: string;
    matches?: {
      field: string;
      error: string;
    };
  };
};
type ValuesType = { [key: string]: any };

export default function createValidator(
  fields: ValidateType,
): (values: ValuesType) => { [key: string]: string } {
  return (values: ValuesType) => {
    const errors = {};

    Object.keys(fields).forEach((key: string) => {
      const field = fields[key];
      const value = values[key];

      if (field.required && (
        !value
        || (typeof value === 'string' && value.trim().length === 0)
      )) {
        errors[key] = field.required;
      } else if (field.email && (
        (typeof value === 'string' && value.trim().length > 0)
        && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      )) {
        errors[key] = field.email;
      } else if (field.matches && value !== values[field.matches.field]) {
        errors[key] = field.matches.error;
      }
    });

    return errors;
  };
}
