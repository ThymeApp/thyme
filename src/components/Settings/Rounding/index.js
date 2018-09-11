// @flow

import React, { Component } from 'react';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

import RoundingField from './RoundingField';

import './Rounding.css';

type RoundingState = {
  startAmount: number,
  startRounding: rounding,
  endAmount: number,
  endRounding: rounding,
}

class Index extends Component<*, RoundingState> {
  state = {
    startAmount: 5,
    startRounding: 'floor',
    endAmount: 5,
    endRounding: 'ceil',
  };

  render() {
    const {
      startRounding,
      startAmount,
      endRounding,
      endAmount,
    } = this.state;

    return (
      <Form className="Rounding">
        <Form.Group widths="equal">
          <RoundingField
            label="Start time rounding"
            rounding={startRounding}
            amount={startAmount}
            onChangeRounding={(round: rounding) => this.setState({ startRounding: round })}
            onChangeAmount={(amount: number) => this.setState({ startAmount: amount })}
          />

          <RoundingField
            label="End time rounding"
            rounding={endRounding}
            amount={endAmount}
            onChangeRounding={(round: rounding) => this.setState({ endRounding: round })}
            onChangeAmount={(amount: number) => this.setState({ endAmount: amount })}
          />
        </Form.Group>
      </Form>
    );
  }
}

export default Index;
