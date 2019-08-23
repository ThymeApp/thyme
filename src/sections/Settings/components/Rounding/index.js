// @flow

import React from 'react';
import { useSelector } from 'react-redux';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import { useActions } from 'core/useActions';

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

const selectors = (state) => ({
  durationRounding: getDurationRounding(state),
  durationAmount: getDurationAmount(state),
  roundingOn: getRoundingOn(state),
});

function RoundingSettings() {
  const {
    durationAmount,
    durationRounding,
    roundingOn,
  } = useSelector(selectors);

  const {
    onChangeDurationRounding,
    onChangeDurationRoundingAmount,
    onChangeRoundingOn,
  } = useActions([updateDurationRounding, updateDurationRoundingAmount, updateRoundingOn]);

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
