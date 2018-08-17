// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import { setStartTimeRounding, setEndTimeRounding } from '../../actions/settings';
import { valueFromEventTarget } from '../../core/dom';
import Combo from './Combo';

type RoundingProps = {
  startTimeRounding: {
    rounding: number,
    roundingDirection: string,
  };
  endTimeRounding: {
    rounding: number,
    roundingDirection: string,
  };
  setStartTimeRounding: (rounding: number, roundingDirection: string) => void;
  setEndTimeRounding: (rounding: number, roundingDirection: string) => void;
}

class Rounding extends Component<RoundingProps> {
  constructor(props) {
    super(props);
    this.onStartTimeDirectionChange = this.onStartTimeDirectionChange.bind(this);
    this.onEndTimeDirectionChange = this.onEndTimeDirectionChange.bind(this);
    this.onStartTimeRoundingChange = this.onStartTimeRoundingChange.bind(this);
    this.onEndTimeRoundingChange = this.onEndTimeRoundingChange.bind(this);
  }

  onStartTimeDirectionChange: (e: Event, data: any) => void;

  onEndTimeDirectionChange: (e: Event, data: any) => void;

  onStartTimeRoundingChange: (e: Event) => void;

  onEndTimeRoundingChange: (e: Event) => void;

  onStartTimeDirectionChange(e, data) {
    const { startTimeRounding, setStartTimeRounding } = this.props;
    setStartTimeRounding(startTimeRounding.rounding, data.value);
  }

  onEndTimeDirectionChange(e, data) {
    const { endTimeRounding, setEndTimeRounding } = this.props;
    setEndTimeRounding(endTimeRounding.rounding, data.value);
  }


  onStartTimeRoundingChange(e) {
    const { setStartTimeRounding, startTimeRounding } = this.props;
    const roundValue = valueFromEventTarget(e.target);
    if (roundValue > 0 && roundValue <= 60) {
      setStartTimeRounding(roundValue, startTimeRounding.roundingDirection);
    } else if (roundValue === '') {
      setStartTimeRounding(roundValue, startTimeRounding.roundingDirection);
    }
  }

  onEndTimeRoundingChange(e) {
    const { setEndTimeRounding, endTimeRounding } = this.props;
    const roundValue = valueFromEventTarget(e.target);
    if (roundValue > 0 && roundValue <= 60) {
      setEndTimeRounding(roundValue, endTimeRounding.roundingDirection);
    } else if (roundValue === '') {
      setEndTimeRounding(roundValue, endTimeRounding.roundingDirection);
    }
  }

  render() {
    const { startTimeRounding, endTimeRounding } = this.props;
    return (
      <Fragment>

        <Header as="h3">
Start time rounding
        </Header>
        <Combo
          title="The rounding method and the number to round to "
          rounding={startTimeRounding.rounding}
          roundingDirection={startTimeRounding.roundingDirection}
          onRoundingChange={this.onStartTimeRoundingChange}
          onRoundingDirectionChange={this.onStartTimeDirectionChange}
        />
        <Header as="h3">
End time rounding
        </Header>
        <Combo
          title="The threshold to run down to"
          rounding={endTimeRounding.rounding}
          roundingDirection={endTimeRounding.roundingDirection}
          onRoundingChange={this.onEndTimeRoundingChange}
          onRoundingDirectionChange={this.onEndTimeDirectionChange}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { startTimeRounding, endTimeRounding } = state.settings;
  return {
    startTimeRounding,
    endTimeRounding,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setStartTimeRounding(rounding: number, roundingDirection: string) {
      dispatch(setStartTimeRounding(rounding, roundingDirection));
    },
    setEndTimeRounding(rounding: number, roundingDirection: string) {
      dispatch(setEndTimeRounding(rounding, roundingDirection));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rounding);
