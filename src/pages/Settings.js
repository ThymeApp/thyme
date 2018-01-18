// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { truncateTime } from '../actions/time';
import { truncateProjects } from '../actions/projects';

import Button from '../components/Button';

type SettingsType = {
  removeTimeData: () => void,
  removeProjectData: () => void,
};

class Settings extends Component<SettingsType> {
  constructor(props) {
    super(props);

    this.onRemoveTime = () => {
      if (window.confirm('Are you SUPER sure you want to remove all timesheet data?')) {
        props.removeTimeData();
      }
    };

    this.onRemoveProjects = () => {
      if (window.confirm('Are you SUPER sure you want to remove all projects data?')) {
        props.removeProjectData();
      }
    };
  }

  onRemoveTime: () => void;
  onRemoveProjects: () => void;

  render() {
    return (
      <div>
        <h2>Settings</h2>

        <h4>Delete data</h4>
        <Button red value="Remove timesheet data" onClick={this.onRemoveTime} />
        <Button red value="Remove project data" onClick={this.onRemoveProjects} />
      </div>
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
