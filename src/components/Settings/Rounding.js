// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Header, Dropdown, Input } from 'semantic-ui-react';

import { setRounding } from '../../actions/settings';
import { valueFromEventTarget } from '../../core/dom';

const options = [
  { key: '5', text: '5', value: '5' },
  { key: '10', text: '10', value: '10' },
  { key: '15', text: '15', value: '15' },
  { key: '30', text: '30', value: '30' },
  { key: '60', text: '60', value: '60' },
];
type RoundingProps = {
  rounding: number;
  setRounding: (value: number) => void;
}

class Rounding extends Component<RoundingProps> {
  constructor(props) {
    super(props);
    this.onRoundingChange = this.onRoundingChange.bind(this);
    this.onChangeRounding = this.onChangeRounding.bind(this);
  }
  onRoundingChange(event, data) {
    this.props.setRounding(data.value);
  }

  onChangeRounding(event) {
    const roundValue = valueFromEventTarget(event.target);
    this.props.setRounding(roundValue);
  }

  render() {
    const { rounding } = this.props;
    return (
      <Fragment>
        <Header as="h3">Rounding</Header>
        <Input
          title="The minutes that the timer rounds to"
          type="number"
          size="small"
          value={rounding}
          onChange={this.onChangeRounding}
          label={
            <Dropdown options={options} onChange={this.onRoundingChange} defaultValue={rounding} />
          }
          labelPosition="left"
          placeholder="Duration rounding"
        />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { rounding } = state.settings;
  return {
    rounding,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRounding(value) {
      dispatch(setRounding(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rounding);
