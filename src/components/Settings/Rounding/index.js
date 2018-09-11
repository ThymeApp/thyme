// @flow

import React, { Component } from 'react';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

import RoundingField from './RoundingField';

import './Rounding.css';

type RoundingState = {
  startAmount: number,
  startRounding: rounding,
}

class Index extends Component<*, RoundingState> {
  state = {
    startAmount: 5,
    startRounding: 'round',
  };

  render() {
    const { startRounding, startAmount } = this.state;

    return (
      <Form className="Rounding">
        <RoundingField
          rounding={startRounding}
          amount={startAmount}
          onChangeRounding={(round: rounding) => this.setState({ startRounding: round })}
          onChangeAmount={(amount: number) => this.setState({ startAmount: amount })}
        />
      </Form>
    );
  }
}

export default Index;
