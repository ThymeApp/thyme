// @flow

import React from 'react';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import { useMappedState, useDispatch } from 'core/useRedux';

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

function RoundingSettings() {
  const {
    durationAmount,
    durationRounding,
    roundingOn,
  } = useMappedState(state => ({
    durationRounding: getDurationRounding(state),
    durationAmount: getDurationAmount(state),
    roundingOn: getRoundingOn(state),
  }));

  const {
    onChangeDurationRounding,
    onChangeDurationRoundingAmount,
    onChangeRoundingOn,
  } = useDispatch(dispatch => ({
    onChangeDurationRounding: (round: Rounding) => dispatch(updateDurationRounding(round)),
    onChangeDurationRoundingAmount: (amount: number) => dispatch(
      updateDurationRoundingAmount(amount),
    ),
    onChangeRoundingOn: (rounding: RoundableOn) => dispatch(updateRoundingOn(rounding)),
  }));

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

export default RoundingSettings;
