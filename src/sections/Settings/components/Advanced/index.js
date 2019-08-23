// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';

import { valueFromEventTarget } from 'core/dom';
import { isValidThymeApi } from 'core/fetch';

import { unregister } from '../../../../serviceWorker';

import { getApiRoot } from '../../selectors';

import { updateApiRoot } from '../../actions';

import './Advanced.css';

type AdvancedSettingsProps = {
  apiRoot: string;
  onUpdateApiRoot: (apiRoot: ?string) => void;
};

type AdvancedSettingsState = {
  connection: 'valid' | 'invalid' | 'validating';
};

class AdvancedSettings extends Component<AdvancedSettingsProps, AdvancedSettingsState> {
  constructor() {
    super();

    this.state = {
      connection: 'validating',
    };
  }

  componentDidMount() {
    this.checkApiValidity();
  }

  onChangeApiRoot = (e: Event) => {
    const value = valueFromEventTarget(e.target);

    this.updateApiRoot(value);
  };

  onCheckApiValidity = debounce(() => this.checkApiValidity(), 100);

  resetApiRoot = () => {
    this.updateApiRoot();
  };

  updateApiRoot(apiRoot: ?string) {
    const { onUpdateApiRoot } = this.props;

    onUpdateApiRoot(apiRoot);
    this.onCheckApiValidity();
  }

  checkApiValidity() {
    const { apiRoot } = this.props;

    isValidThymeApi(apiRoot)
      .then((valid) => this.setState({ connection: valid ? 'valid' : 'invalid' }));
  }

  render() {
    const { apiRoot } = this.props;
    const { connection } = this.state;

    return (
      <>
        <Message attached warning icon>
          <Icon name="warning" />
          <div>
            <Message.Header>
              Attention
            </Message.Header>
            <p>
              The following settings are for advanced users / developers only.
              Adjust these at your own risk.
            </p>
          </div>
        </Message>

        <Form className="attached fluid segment">
          <Form.Field>
            <label>
              Thyme Capsule API location
            </label>
            <div className="Advanced__InputContainer">
              <Input
                loading={connection === 'validating'}
                error={connection === 'invalid'}
                icon={connection === 'valid' ? 'check' : 'delete'}
                iconPosition="left"
                placeholder="The endpoint URI to the API"
                type="text"
                value={apiRoot}
                onChange={this.onChangeApiRoot}
              />
              <Button
                className="Advanced__Redo"
                icon="redo"
                content="Restore to default"
                onClick={this.resetApiRoot}
              />
            </div>
          </Form.Field>
          {'serviceWorker' in navigator && (
            <Form.Field>
              <label>
                Service Worker
              </label>
              <p>
                In some cases the Service Worker does not reload properly. This might fix your
                issues.
              </p>
              <Button
                icon="refresh"
                onClick={() => {
                  unregister(() => window.location.reload());
                }}
                content="Force reload"
              />
            </Form.Field>
          )}
        </Form>
      </>
    );
  }
}

function mapStateToProps(state: StateShape) {
  return {
    apiRoot: getApiRoot(state),
  };
}

function mapDispatchToProp(dispatch: ThymeDispatch) {
  return {
    onUpdateApiRoot(apiRoot: ?string) {
      dispatch(updateApiRoot(apiRoot));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(AdvancedSettings);
