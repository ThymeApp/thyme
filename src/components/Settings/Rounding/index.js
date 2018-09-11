// @flow

import React, { Component } from 'react';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import RoundingField from './RoundingField';
import RoundingExample from './RoundingExample';

import './Rounding.css';

type RoundingState = {
  durationAmount: number,
  durationRounding: rounding,
}

class Index extends Component<*, RoundingState> {
  state = {
    durationAmount: 5,
    durationRounding: 'round',
  };

  render() {
    const { durationAmount, durationRounding } = this.state;

    return (
      <div>
        <Message attached info>
          Setting duration rounding will round the durations shown in the timesheet and on
          reports.
        </Message>
        <Form className="Rounding attached fluid segment">
          <RoundingField
            label="Duration rounding"
            rounding={durationRounding}
            amount={durationAmount}
            onChangeRounding={(round: rounding) => this.setState({ durationRounding: round })}
            onChangeAmount={(amount: number) => this.setState({ durationAmount: amount })}
          />
        </Form>
        <RoundingExample amount={durationAmount} rounding={durationRounding} />
      </div>
    );
  }
}

export default Index;
