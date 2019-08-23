// @flow

import React, { Component } from 'react';
import Confetti from 'react-dom-confetti';
import { Link } from 'react-router-dom';

import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import { trackPageview } from 'core/analytics';

type CompletedState = {
  pop: boolean;
};

class Completed extends Component<*, CompletedState> {
  constructor() {
    super();

    this.state = {
      pop: false,
    };
  }

  componentDidMount() {
    this.setState({ pop: true });

    trackPageview('Premium / Completed');
  }

  render() {
    const { pop } = this.state;

    const config = {
      angle: 90,
      spread: 90,
      startVelocity: 45,
      elementCount: 50,
      decay: 0.90,
    };

    return (
      <Container text style={{ padding: '5em 0' }}>
        <Segment vertical size="big">
          <Header as="h1" style={{ textAlign: 'center', marginBottom: '2em' }}>
            Thank you for being a premium member!
          </Header>
          <p>
            You account has all the premium features enabled. Thank you for being awesome. Use Thyme
            to see the features you unlocked.
          </p>

          <p>
            If you want to manage your account or subscription you can use the account settings
            page.
          </p>
          <div style={{ margin: 'auto', width: 0 }}>
            <Confetti active={pop} config={config} />
          </div>
          <section className="CenterButtons">
            <Button as={Link} to="/" primary size="big">
              Use Thyme
            </Button>
            <Button as={Link} to="/account" size="big">
              Account Settings
            </Button>
          </section>
        </Segment>
      </Container>
    );
  }
}

export default Completed;
