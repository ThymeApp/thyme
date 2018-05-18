// @flow
import React, { Component } from 'react';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

import './style.css';

type AccountState = {
  isOpen: boolean,
  isLoading: boolean,
  login: {
    email: string,
    password: string,
  },
}

class Account extends Component<*, AccountState> {
  state = {
    isOpen: false,
    isLoading: false,
    login: {
      email: '',
      password: '',
    },
  };

  onSubmit = () => {
    const { login } = this.state;

    this.setState({ isLoading: true });

    console.log(login.email, login.password);
  };

  handleOpen = () => this.setState({ isOpen: true });
  handleClose = () => this.setState({ isOpen: false });

  handleInput = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const [obj, prop] = e.currentTarget.name.split('.');

      if (obj && prop) {
        this.setState({
          [obj]: {
            ...this.state[obj],
            [prop]: e.currentTarget.value || '',
          },
        });
      }
    }
  };

  render() {
    const { isOpen, isLoading, login } = this.state;

    return (
      <div>
        <Popup
          trigger={<Button inverted>Log in to sync</Button>}
          open={isOpen}
          position="bottom right"
          on="click"
          onClose={this.handleClose}
          onOpen={this.handleOpen}
        >
          <Form
            style={{ width: 230 }}
            loading={isLoading}
            onSubmit={this.onSubmit}
          >
            <Form.Field>
              <label htmlFor="login.email">Email address</label>
              <Input
                id="login.email"
                type="text"
                size="small"
                name="login.email"
                value={login.email}
                onChange={this.handleInput}
                placeholder="Your email address"
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="login.password">Password</label>
              <Input
                id="login.password"
                type="password"
                size="small"
                name="login.password"
                value={login.password}
                onChange={this.handleInput}
                placeholder="Your password"
              />
            </Form.Field>
            <section className="Account__Submit-Bar">
              <Form.Button primary>Login</Form.Button>
              or
              <Button basic>Register</Button>
            </section>
          </Form>
        </Popup>
      </div>
    );
  }
}

export default Account;
