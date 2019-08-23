// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';

import { alert } from 'actions/app';
import { truncateProjects } from 'sections/Projects/actions';
import { truncateTime } from 'sections/TimeSheet/actions';

type DeleteDataProps = {
  removeTimeData: () => void;
  removeProjectData: () => void;
  showAlert: (message: string) => void;
}

type DeleteDataState = {
  confirmRemoveTimesheet: boolean;
  confirmRemoveProjects: boolean;
}

class DeleteData extends Component<DeleteDataProps, DeleteDataState> {
  constructor() {
    super();

    this.state = {
      confirmRemoveTimesheet: false,
      confirmRemoveProjects: false,
    };
  }

  onRemoveTime = () => { this.setState({ confirmRemoveTimesheet: true }); };

  onRemoveProjects = () => { this.setState({ confirmRemoveProjects: true }); };

  onCancelConfirm = () => {
    this.setState({
      confirmRemoveTimesheet: false,
      confirmRemoveProjects: false,
    });
  };

  onConfirmRemoveTime = () => {
    const { removeTimeData, showAlert } = this.props;

    this.onCancelConfirm();
    removeTimeData();
    showAlert('All time data has been removed');
  };

  onConfirmRemoveProjects = () => {
    const { removeProjectData, showAlert } = this.props;

    this.onCancelConfirm();
    removeProjectData();
    showAlert('All project data has been removed');
  };

  render() {
    const {
      confirmRemoveTimesheet,
      confirmRemoveProjects,
    } = this.state;

    return (
      <>
        <Button color="red" onClick={this.onRemoveTime}>
          <Icon name="trash" />
          Remove timesheet data
        </Button>
        <Confirm
          open={confirmRemoveTimesheet}
          content="Are you SUPER sure you want to remove all timesheet data?"
          confirmButton="Remove data"
          size="mini"
          onCancel={this.onCancelConfirm}
          onConfirm={this.onConfirmRemoveTime}
        />

        <Button color="red" onClick={this.onRemoveProjects}>
          <Icon name="trash" />
          Remove project data
        </Button>
        <Confirm
          open={confirmRemoveProjects}
          content="Are you SUPER sure you want to remove all projects data?"
          confirmButton="Remove data"
          size="mini"
          onCancel={this.onCancelConfirm}
          onConfirm={this.onConfirmRemoveProjects}
        />
      </>
    );
  }
}

function mapDispatchToProps(dispatch: ThymeDispatch) {
  return {
    removeTimeData() {
      dispatch(truncateTime());
    },

    removeProjectData() {
      dispatch(truncateProjects());
    },

    showAlert(message: string) {
      dispatch(alert(message));
    },
  };
}

export default connect(null, mapDispatchToProps)(DeleteData);
