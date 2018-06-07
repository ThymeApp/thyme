// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';

import { alert } from '../../actions/app';
import { truncateTime } from '../../actions/time';
import { truncateProjects } from '../../actions/projects';

type DeleteDataState = {
  confirmRemoveTimesheet: boolean;
  confirmRemoveProjects: boolean;
}

class DeleteData extends Component<*, DeleteDataState> {
  state = {
    confirmRemoveTimesheet: false,
    confirmRemoveProjects: false,
  };

  onCancelConfirm = () => {
    this.setState({
      confirmRemoveTimesheet: false,
      confirmRemoveProjects: false,
    });
  };

  onRemoveTime = () => { this.setState({ confirmRemoveTimesheet: true }); };
  onRemoveProjects = () => { this.setState({ confirmRemoveProjects: true }); };
  onConfirmRemoveTime = () => {
    this.onCancelConfirm();
    this.props.removeTimeData();
    this.props.alert('All time data has been removed');
  };
  onConfirmRemoveProjects = () => {
    this.onCancelConfirm();
    this.props.removeProjectData();
    this.props.alert('All project data has been removed');
  };

  render() {
    const {
      confirmRemoveTimesheet,
      confirmRemoveProjects,
    } = this.state;

    return (
      <Fragment>
        <Header as="h3">Delete data</Header>
        <Button color="red" onClick={this.onRemoveTime}>Remove timesheet data</Button>
        <Confirm
          open={confirmRemoveTimesheet}
          content="Are you SUPER sure you want to remove all timesheet data?"
          confirmButton="Remove data"
          size="mini"
          onCancel={this.onCancelConfirm}
          onConfirm={this.onConfirmRemoveTime}
        />

        <Button color="red" onClick={this.onRemoveProjects}>Remove project data</Button>
        <Confirm
          open={confirmRemoveProjects}
          content="Are you SUPER sure you want to remove all projects data?"
          confirmButton="Remove data"
          size="mini"
          onCancel={this.onCancelConfirm}
          onConfirm={this.onConfirmRemoveProjects}
        />
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeTimeData() {
      dispatch(truncateTime());
    },

    removeProjectData() {
      dispatch(truncateProjects());
    },

    alert(message: string) {
      dispatch(alert(message));
    },
  };
}

export default connect(null, mapDispatchToProps)(DeleteData);

