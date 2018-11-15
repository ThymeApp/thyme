// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';

import { valueFromEventTarget } from 'core/dom';

import {
  updatePerPage,
  enableNotes,
  disableNotes,
  enableProjects,
  disableProjects,
  enableEndDate,
  disableEndDate,
} from '../actions';

import {
  getEntriesPerPage,
  getEnableNotes,
  getEnableProjects,
  getEnableEndDate,
} from '../selectors';

type TimeSheetProps = {
  perPage: number;
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  changePerPage: (perPage: number | string) => void;
  onEnableNotes: () => void;
  onDisableNotes: () => void;
  onEnableProjects: () => void;
  onDisableProjects: () => void;
  onEnableEndDate: () => void;
  onDisableEndDate: () => void;
};

class TimeSheet extends Component<TimeSheetProps> {
  onUpdatePerPage = (e: Event) => {
    const { changePerPage } = this.props;

    const value = parseInt(valueFromEventTarget(e.target), 10);

    changePerPage(value || '');
  };

  onBlurPerPage = () => {
    const { perPage, changePerPage } = this.props;

    if (perPage === '' || perPage < 1) {
      // if invalid, change back to 10
      changePerPage(10);
    }
  };

  render() {
    const {
      perPage,
      enabledNotes,
      enabledProjects,
      enabledEndDate,
      onEnableNotes,
      onDisableNotes,
      onEnableProjects,
      onDisableProjects,
      onEnableEndDate,
      onDisableEndDate,
    } = this.props;

    return (
      <Form>
        <Form.Field style={{ maxWidth: 300 }}>
          <label>Number of entries per page</label>
          <Input
            type="number"
            size="small"
            value={perPage}
            onChange={this.onUpdatePerPage}
            onBlur={this.onBlurPerPage}
          />
        </Form.Field>
        <Form.Field>
          <label>Visible fields on timesheet</label>
        </Form.Field>
        <Form.Field>
          <Checkbox
            toggle
            label="Show adding notes"
            checked={enabledNotes}
            onChange={enabledNotes ? onDisableNotes : onEnableNotes}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            toggle
            label="Show assigning projects"
            checked={enabledProjects}
            onChange={enabledProjects ? onDisableProjects : onEnableProjects}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            toggle
            label="Select end date manually"
            checked={enabledEndDate}
            onChange={enabledEndDate ? onDisableEndDate : onEnableEndDate}
          />
        </Form.Field>
      </Form>
    );
  }
}

function mapStateToProps(state: StateShape) {
  return {
    perPage: getEntriesPerPage(state),
    enabledNotes: getEnableNotes(state),
    enabledProjects: getEnableProjects(state),
    enabledEndDate: getEnableEndDate(state),
  };
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    changePerPage(perPage: number | string) {
      dispatch(updatePerPage(perPage));
    },
    onEnableNotes() {
      dispatch(enableNotes());
    },
    onDisableNotes() {
      dispatch(disableNotes());
    },
    onEnableProjects() {
      dispatch(enableProjects());
    },
    onDisableProjects() {
      dispatch(disableProjects());
    },
    onEnableEndDate() {
      dispatch(enableEndDate());
    },
    onDisableEndDate() {
      dispatch(disableEndDate());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet);
