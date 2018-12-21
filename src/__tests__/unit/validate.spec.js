import createValidator from '../../core/validate';

describe('Validate', () => {
  it('Checks required fields', () => {
    const validator = createValidator({
      name: {
        required: 'Required field.',
      },
      name2: {
        required: 'Required field.',
      },
      checkbox: {
        required: 'Agree',
      },
      checkbox2: {
        required: 'Agree too!',
      },
    });

    const values = {
      name: '',
      name2: 'Something',
      name3: '',
      checkbox2: true,
    };
    const expectedErrors = { name: 'Required field.', checkbox: 'Agree' };

    expect(validator(values)).toEqual(expectedErrors);
  });

  it('Checks email fields', () => {
    const validator = createValidator({
      email: {
        email: 'Invalid email address',
      },
      email2: {
        email: 'Invalid email address',
      },
      email3: {
        email: 'Invalid email address',
      },
    });

    const values = {
      email: 'bla',
      email2: '',
      email3: 'test@usethyme.com',
      checkbox2: true,
    };
    const expectedErrors = { email: 'Invalid email address' };

    expect(validator(values)).toEqual(expectedErrors);
  });

  it('Checks matching fields', () => {
    const validator = createValidator({
      password2: {
        matches: {
          field: 'password',
          error: 'Passwords do not match',
        },
      },
      password3: {
        matches: {
          field: 'password',
          error: 'Passwords do not match',
        },
      },
    });

    const values = {
      password: 'bla',
      password2: 'alb',
      password3: 'bla',
    };
    const expectedErrors = { password2: 'Passwords do not match' };

    expect(validator(values)).toEqual(expectedErrors);
  });
});
