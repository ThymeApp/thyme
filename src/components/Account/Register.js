// @flow
import React, { Component } from 'react';
import classnames from 'classnames';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

type RegisterProps = {
  inView: boolean;
  goToLogin: (e: Event) => void;
};

type RegisterState = {
  email: string,
  password: string,
  confirmPassword: string,
  isLoading: boolean,
};

class Register extends Component<RegisterProps, RegisterState> {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
  };

  onSubmit = () => {
    this.setState({ isLoading: true });
  };

  handleInput = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      isLoading,
    } = this.state;
    const { inView, goToLogin } = this.props;

    return (
      <Form
        className={classnames('Register', { 'Register--visible': inView })}
        loading={isLoading}
        onSubmit={this.onSubmit}
      >
        <Form.Field>
          <label htmlFor="register-email">Email address</label>
          <Input
            id="register-email"
            type="text"
            size="small"
            name="email"
            autoComplete="username email"
            value={email}
            onChange={this.handleInput}
            placeholder="Your email address"
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="register-password">Password</label>
          <Input
            id="register-password"
            type="password"
            size="small"
            name="password"
            autoComplete="off"
            value={password}
            onChange={this.handleInput}
            placeholder="Enter a password"
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="confirm-password">Confirm password</label>
          <Input
            id="confirm-password"
            type="password"
            size="small"
            name="confirmPassword"
            autoComplete="off"
            value={confirmPassword}
            onChange={this.handleInput}
            placeholder="Confirm password"
          />
        </Form.Field>
        <section className="Account__Submit-Bar">
          <Form.Button primary>Register</Form.Button>
          or
          <Button
            basic
            onClick={goToLogin}
          >
            Log in
          </Button>
        </section>
      </Form>
    );
  }
}

export default Register;
