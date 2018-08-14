// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import { setRounding, setRoundingDown } from '../../actions/settings';
import { valueFromEventTarget } from '../../core/dom';
import Combo from './Combo';

type RoundingProps = {
  rounding: string;
  roundingDown: string;
  setRoundingProp: (value: any) => void;
  setRoundingDownProp: (value: any) => void;
}

class Rounding extends Component<RoundingProps> {
  constructor(props) {
    super(props);
    this.onChangeRoundingDown = this.onChangeRoundingDown.bind(this);
    this.onChangeRounding = this.onChangeRounding.bind(this);
    this.onRoundingDownDropDownChange = this.onRoundingDownDropDownChange.bind(this);
    this.onRoundingDropDownChange = this.onRoundingDropDownChange.bind(this);
  }

  onRoundingDownDropDownChange: (e: Event, data: any) => void;

  onRoundingDropDownChange: (e: Event, data: any) => void;

  onChangeRounding: (e: Event) => void;

  onChangeRoundingDown: (e: Event) => void;

  onRoundingDropDownChange(e, data) {
    const { setRoundingProp } = this.props;
    setRoundingProp(data.value);
  }

  onRoundingDownDropDownChange(e, data) {
    const { rounding, setRoundingDownProp } = this.props;
    const roundingInt = parseInt(data.value, 10);
    if (roundingInt < parseInt(rounding, 10)) {
      setRoundingDownProp(data.value);
    }
  }


  onChangeRounding(e) {
    const { setRoundingProp } = this.props;
    const roundValue = valueFromEventTarget(e.target);
    const roundValueInt = parseInt(roundValue, 10);
    if (roundValueInt <= 60 && roundValueInt > 0) {
      setRoundingProp(roundValue);
    }
    if (roundValue === '') {
      setRoundingProp(roundValue);
    }
  }

  onChangeRoundingDown(e) {
    const { rounding, setRoundingDownProp } = this.props;
    const roundDown = valueFromEventTarget(e.target);
    const roundDownInt = parseInt(roundDown, 10);
    if (roundDownInt < parseInt(rounding, 10)
      && roundDownInt <= 60 && roundDownInt >= 0) {
      setRoundingDownProp(roundDown);
    }
    if (roundDown === '') {
      setRoundingDownProp(roundDown);
    }
  }

  render() {
    const { rounding, roundingDown } = this.props;
    return (
      <Fragment>

        <Header as="h3">
Rounding UP
        </Header>
        <Combo title="The minutes that the end time rounds to" rounding={rounding} onInputChange={this.onChangeRounding} onDropDownChange={this.onRoundingDropDownChange} />

        <Header as="h3">
Rounding Down Threshold
        </Header>
        <Combo title="The threshold to run down to" rounding={roundingDown} onInputChange={this.onChangeRoundingDown} onDropDownChange={this.onRoundingDownDropDownChange} />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { rounding, roundingDown } = state.settings;
  return {
    rounding,
    roundingDown,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRoundingProp(value) {
      dispatch(setRounding(value));
    },
    setRoundingDownProp(value) {
      dispatch(setRoundingDown(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rounding);
