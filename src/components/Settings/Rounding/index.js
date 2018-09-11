// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';

import { updateDurationRounding, updateDurationRoundingAmount } from '../../../actions/settings';

import { getDurationRounding, getDurationAmount } from '../../../selectors/settings';

import RoundingField from './RoundingField';
import RoundingExample from './RoundingExample';

import './Rounding.css';

type RoundingProps = {
  durationAmount: number;
  durationRounding: rounding;
  onChangeDurationRounding: (round: rounding) => void;
  onChangeDurationRoundingAmount: (amount: number) => void;
}

function Rounding({
  durationAmount,
  durationRounding,
  onChangeDurationRounding,
  onChangeDurationRoundingAmount,
}: RoundingProps) {
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
          onChangeRounding={(round: rounding) => onChangeDurationRounding(round)}
          onChangeAmount={(amount: number) => onChangeDurationRoundingAmount(amount)}
        />
      </Form>
      <RoundingExample amount={durationAmount} rounding={durationRounding} />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    durationRounding: getDurationRounding(state),
    durationAmount: getDurationAmount(state),
  };
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators({
    onChangeDurationRounding: updateDurationRounding,
    onChangeDurationRoundingAmount: updateDurationRoundingAmount,
  }, dispatch),
)(Rounding);
