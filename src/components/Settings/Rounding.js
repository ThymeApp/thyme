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
  setRounding: (value: any) => void;
  setRoundingDown: (value: any) => void;
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
    this.props.setRounding(data.value);
  }
  onRoundingDownDropDownChange(e, data) {
    if (data.value < this.props.rounding) {
      this.props.setRoundingDown(data.value);
    }
  }


  onChangeRounding(e) {
    const roundValue = valueFromEventTarget(e.target);
    const roundValueInt = parseInt(roundValue, 10);
    if (roundValueInt <= 60) {
      this.props.setRounding(roundValue);
    }
    if (roundValue === '') {
      this.props.setRounding(roundValue);
    }
  }
  onChangeRoundingDown(e) {
    const roundDown = valueFromEventTarget(e.target);
    const roundDownInt = parseInt(roundDown, 10);
    if (roundDown < this.props.rounding && roundDownInt <= 60) {
      this.props.setRoundingDown(roundDown);
    }
    if (roundDown === '') {
      this.props.setRoundingDown(roundDown);
    }
  }

  render() {
    const { rounding, roundingDown } = this.props;
    return (
      <Fragment>

        <Header as="h3">Rounding UP</Header>
        <Combo title="The minutes that the end time rounds to" rounding={rounding} onInputChange={this.onChangeRounding} onDropDownChange={this.onRoundingDropDownChange} />

        <Header as="h3">Rounding Down Threshold</Header>
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
    setRounding(value) {
      dispatch(setRounding(value));
    },
    setRoundingDown(value) {
      dispatch(setRoundingDown(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rounding);
