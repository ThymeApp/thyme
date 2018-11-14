// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import type { Dispatch } from 'redux';

import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';

import { valueFromEventTarget } from 'core/dom';
import { isValidThymeApi } from 'core/fetch';

import { getApiRoot } from '../../selectors';

import { updateApiRoot } from '../../actions';

type AdvancedSettingsProps = {
  apiRoot: string;
  onUpdateApiRoot: (apiRoot: string) => void;
};

type AdvancedSettingsState = {
  connection: 'valid' | 'invalid' | 'validating';
};

class AdvancedSettings extends Component<AdvancedSettingsProps, AdvancedSettingsState> {
  state = {
    connection: 'validating',
  };

  componentDidMount() {
    this.checkApiValidity();
  }

  onChangeApiRoot = (e: Event) => {
    const { onUpdateApiRoot } = this.props;

    const value = valueFromEventTarget(e.target);

    onUpdateApiRoot(value);

    this.onCheckApiValidity();
  };

  onCheckApiValidity = debounce(() => this.checkApiValidity(), 100);

  checkApiValidity() {
    const { apiRoot } = this.props;

    isValidThymeApi(apiRoot)
      .then(valid => this.setState({ connection: valid ? 'valid' : 'invalid' }));
  }

  render() {
    const { apiRoot } = this.props;
    const { connection } = this.state;

    return (
      <Form
        noValidate
      >
        <Message
          warning
          icon="warning"
          header="Attention"
          content="The following settings are for advanced users / developers only. Adjust these at your own risk."
        />

        <Form.Field>
          <label>
            API location
          </label>
          <div>
            <Input
              loading={connection === 'validating'}
              error={connection === 'invalid'}
              icon={connection === 'valid' ? 'check' : 'delete'}
              iconPosition="left"
              placeholder="The endpoint URI to the API"
              type="text"
              size="small"
              value={apiRoot}
              onChange={this.onChangeApiRoot}
            />
          </div>
        </Form.Field>
      </Form>
    );
  }
}

function mapStateToProps(state: storeShape) {
  return {
    apiRoot: getApiRoot(state),
  };
}

function mapDispatchToProp(dispatch: Dispatch<*>) {
  return {
    onUpdateApiRoot(apiRoot: string) {
      dispatch(updateApiRoot(apiRoot));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(AdvancedSettings);
