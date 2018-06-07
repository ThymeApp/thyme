// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';

import ImportExport from '../components/Settings/ImportExport';

import { truncateTime } from '../actions/time';
import { truncateProjects } from '../actions/projects';

type SettingsType = {
  removeTimeData: () => void,
  removeProjectData: () => void,
};

type SettingsState = {
  confirmRemoveTimesheet: boolean,
  confirmRemoveProjects: boolean,
}

class Settings extends Component<SettingsType, SettingsState> {
  constructor(props) {
    super(props);

    this.onRemoveTime = () => { this.setState({ confirmRemoveTimesheet: true }); };
    this.onConfirmRemoveTime = () => this.props.removeTimeData();

    this.onRemoveProjects = () => { this.setState({ confirmRemoveProjects: true }); };
    this.onConfirmRemoveProjects = () => this.props.removeProjectData();

    this.onCancelConfirm = () => {
      this.setState({
        confirmRemoveTimesheet: false,
        confirmRemoveProjects: false,
      });
    };

    this.state = {
      confirmRemoveTimesheet: false,
      confirmRemoveProjects: false,
    };
  }

  onRemoveTime: () => void;
  onConfirmRemoveTime: () => void;
  onRemoveProjects: () => void;
  onConfirmRemoveProjects: () => void;
  onCancelConfirm: () => void;

  render() {
    const {
      confirmRemoveTimesheet,
      confirmRemoveProjects,
    } = this.state;

    return (
      <Container>
        <Header as="h1">Settings</Header>

        <ImportExport />

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

        <Header as="h3">About</Header>
        Thyme is a creation by <a href="https://theclevernode.com">Gaya Kessler</a>.
        It is <a href="https://github.com/Gaya/thyme">open source</a> and free to use.
        All your data is stored in your own browser.
        Issues / requests can be <a href="https://github.com/Gaya/thyme/issues">filed on Github</a>.
      </Container>
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
  };
}

export default connect(null, mapDispatchToProps)(Settings);
