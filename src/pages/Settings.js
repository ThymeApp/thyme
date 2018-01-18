// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileSaver from 'file-saver';
import format from 'date-fns/format';

import { stateToExport } from '../core/importExport';

import { truncateTime } from '../actions/time';
import { truncateProjects } from '../actions/projects';

import Button from '../components/Button';

type SettingsType = {
  time: any,
  projects: any,
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

    this.onExportData = this.exportData.bind(this);
  }

  onRemoveTime: () => void;
  onRemoveProjects: () => void;
  onExportData: () => void;

  exportData() {
    const { time, projects } = this.props;

    const stateToSave = stateToExport({ time, projects });

    const blob = new Blob(
      [JSON.stringify(stateToSave)],
      { type: 'application/json;charset=utf-8' },
    );

    FileSaver.saveAs(blob, `thyme-export_${format(new Date(), 'YYYY-MM-DD')}.json`);
  }

  render() {
    return (
      <div>
        <h2>Settings</h2>

        <h4>Export / Import</h4>
        <Button value="Export data" onClick={this.onExportData} />

        <h4>Delete data</h4>
        <Button red value="Remove timesheet data" onClick={this.onRemoveTime} />
        <Button red value="Remove project data" onClick={this.onRemoveProjects} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { time, projects } = state;

  return { time, projects };
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
