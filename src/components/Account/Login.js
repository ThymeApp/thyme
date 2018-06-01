// @flow
import React, { Component } from 'react';
import classnames from 'classnames';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

type LoginProps = {
  inView: boolean,
  goToRegister: (e: Event) => void;
};

type LoginState = {
  email: string,
  password: string,
  isLoading: boolean,
};

class Login extends Component<LoginProps, LoginState> {
  state = {
    email: '',
    password: '',
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
    const { email, password, isLoading } = this.state;
    const { inView, goToRegister } = this.props;

    return (
      <Form
        className={classnames('Login', { 'Login--visible': inView })}
        loading={isLoading}
        onSubmit={this.onSubmit}
      >
        <Form.Field>
          <label htmlFor="email">Email address</label>
          <Input
            id="email"
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
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            size="small"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={this.handleInput}
            placeholder="Your password"
          />
        </Form.Field>
        <section className="Account__Submit-Bar">
          <Form.Button primary>Login</Form.Button>
          or
          <Button
            basic
            onClick={goToRegister}
          >
            Register
          </Button>
        </section>
      </Form>
    );
  }
}

export default Login;
