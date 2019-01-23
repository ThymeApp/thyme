// @flow

import React, { Component } from 'react';

import { valueFromEventTarget } from 'core/dom';

import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

const noop = () => ({});

type DebouncedInputState = {
  value: string;
};

class DebouncedInput extends Component<*, DebouncedInputState> {
  constructor(props: any) {
    super(props);

    this.state = { value: props.value || '' };
  }

  componentDidUpdate(prevProps: any): void {
    const { value: stateValue } = this.state;
    const { value } = this.props;

    if (value !== prevProps.value && value !== stateValue) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ value });
    }
  }

  updateValue = (e: Event) => {
    this.setState({ value: valueFromEventTarget(e.target) });
  };

  onChange = () => {
    const { value } = this.state;
    const { onChange } = this.props;

    if (onChange) onChange(value);
  };

  render() {
    const { props, state } = this;
    const { value } = state;
    const { setRef, ...otherProps } = props;

    return (
      <Input
        {...otherProps}
        ref={setRef || noop}
        value={value}
        onChange={this.updateValue}
        onBlur={this.onChange}
      />
    );
  }
}

export default DebouncedInput;
