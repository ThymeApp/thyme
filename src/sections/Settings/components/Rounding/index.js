// @flow

import React from 'react';
import { connect } from 'react-redux';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import {
  updateDurationRounding,
  updateDurationRoundingAmount,
  updateRoundingOn,
} from '../../actions';

import { getDurationRounding, getDurationAmount, getRoundingOn } from '../../selectors';

import RoundingField from './RoundingField';
import RoundingExample from './RoundingExample';
import RoundingOn from './RoundingOn';

import './Rounding.css';

type RoundingProps = {
  durationAmount: number;
  durationRounding: Rounding;
  roundingOn: RoundableOn;
  onChangeDurationRounding: (round: Rounding) => void;
  onChangeDurationRoundingAmount: (amount: number) => void;
  onChangeRoundingOn: (roundingOn: RoundableOn) => void;
}

function RoundingSettings({
  durationAmount,
  durationRounding,
  roundingOn,
  onChangeDurationRounding,
  onChangeDurationRoundingAmount,
  onChangeRoundingOn,
}: RoundingProps) {
  return (
    <div>
      <Message attached>
        Setting duration rounding will round the durations shown in the timesheet and on the
        reports according to your preferences.
      </Message>
      <Form className="Rounding attached fluid segment">
        <RoundingField
          label="Duration rounding"
          rounding={durationRounding}
          amount={durationAmount}
          onChangeRounding={onChangeDurationRounding}
          onChangeAmount={onChangeDurationRoundingAmount}
        />
        <RoundingOn
          roundingOn={roundingOn}
          onChange={onChangeRoundingOn}
        />
      </Form>
      <RoundingExample
        amount={durationAmount}
        rounding={durationRounding}
        roundingOn={roundingOn}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    durationRounding: getDurationRounding(state),
    durationAmount: getDurationAmount(state),
    roundingOn: getRoundingOn(state),
  };
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    onChangeDurationRounding(round: Rounding) {
      dispatch(updateDurationRounding(round));
    },
    onChangeDurationRoundingAmount(amount: number) {
      dispatch(updateDurationRoundingAmount(amount));
    },
    onChangeRoundingOn(roundingOn: RoundableOn) {
      dispatch(updateRoundingOn(roundingOn));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoundingSettings);
