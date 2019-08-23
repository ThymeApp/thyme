// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';

import { alert } from 'actions/app';

import { addReport } from '../../actions';

type SaveProps = {
  isOpen: boolean;
  filters: Array<string>,
  from: Date,
  to: Date,
  onAddReport: (name: string, filters: Array<string>, from: Date, to: Date) => void,
  onClose: () => void;
  showAlert: (message: string) => void;
};

type SaveState = {
  name: string;
  error: boolean;
};

class Save extends Component<SaveProps, SaveState> {
  timeout: TimeoutID;

  constructor() {
    super();

    this.state = {
      name: '',
      error: false,
    };
  }

  onUpdateName = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.updateName(e.target.value);
    }
  };

  onKeyPress = (e: KeyboardEvent) => {
    // check if return is pressed
    if (e.key && e.key === 'Enter') {
      this.onAddReport(e);
    }
  };

  onAddReport = (e: Event) => {
    e.preventDefault();

    const {
      filters,
      from,
      to,
      onAddReport,
      showAlert,
    } = this.props;
    const { name } = this.state;

    if (name.trim() === '') {
      this.setState({ error: true });
      return;
    }

    this.setState({ error: false });

    showAlert(`Report has been saved as "${name}"`);
    onAddReport(name, filters, from, to);

    this.closeModal();
  };

  closeModal = () => {
    const { onClose } = this.props;


    this.setState({
      name: '',
      error: false,
    });

    clearTimeout(this.timeout);
    onClose();
  };

  updateName(name: string) {
    this.setState({ name });
  }

  render() {
    const { isOpen } = this.props;
    const { name, error } = this.state;

    return (
      <Modal size="tiny" open={isOpen} onClose={this.closeModal}>
        <Header content="Save Current Report" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                name="report-name"
                type="text"
                placeholder="Enter name of report..."
                value={name}
                onChange={this.onUpdateName}
                onKeyPress={this.onKeyPress}
                style={{ marginRight: 12 }}
                error={error}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.closeModal}>
            Cancel
          </Button>
          <Button onClick={this.onAddReport} primary>
            <Icon name="save" />
            Save Report
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    onAddReport(name: string, filters: Array<string>, from: Date, to: Date) {
      dispatch(addReport(name, filters, from, to));
    },
    showAlert(message: string) {
      dispatch(alert(message));
    },
  };
}

export default connect(null, mapDispatchToProps)(Save);
