// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Button, Confirm } from 'semantic-ui-react';
import FileSaver from 'file-saver';
import format from 'date-fns/format';

import { stateToExport, validData, parseImportData } from '../core/importExport';

import { importJSONData } from '../actions/app';
import { truncateTime } from '../actions/time';
import { truncateProjects } from '../actions/projects';

type SettingsType = {
  time: any,
  projects: any,
  reports: any,
  removeTimeData: () => void,
  removeProjectData: () => void,
  importData: (data: any) => void,
};

type SettingsState = {
  confirmImport: boolean,
}

class Settings extends Component<SettingsType, SettingsState> {
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

    this.onImportData = () => { this.setState({ confirmImport: true }); };

    this.onCancelConfirm = () => {
      this.setState({
        confirmImport: false,
      });
    };

    this.onExportData = this.exportData.bind(this);
    this.onOpenImportInput = this.openImportInput.bind(this);

    // create file upload element
    const input = document.createElement('input');
    input.setAttribute('name', 'upload');
    input.setAttribute('type', 'file');

    input.addEventListener('change', this.handleFileChange.bind(this));

    this.uploadInput = input;

    this.state = {
      confirmImport: false,
    };
  }

  onRemoveTime: () => void;
  onRemoveProjects: () => void;
  onExportData: () => void;
  onOpenImportInput: () => void;
  onImportData: () => void;
  onCancelConfirm: () => void;
  uploadInput: HTMLInputElement;

  exportData() {
    const { time, projects, reports } = this.props;

    const stateToSave = stateToExport({ time, projects, reports });

    const blob = new Blob(
      [JSON.stringify(stateToSave)],
      { type: 'application/json;charset=utf-8' },
    );

    FileSaver.saveAs(blob, `thyme-export_${format(new Date(), 'YYYY-MM-DD')}.json`);
  }

  openImportInput() {
    // close confirm modal
    this.onCancelConfirm();

    // open file dialog
    this.uploadInput.click();
  }

  handleImportData(jsonString: string) {
    try {
      const importData = parseImportData(JSON.parse(jsonString));

      if (!validData(importData)) {
        alert('The provided JSON is not a valid Thyme timesheet');
        return;
      }

      this.props.importData(importData);

      alert('Import successful');
    } catch (e) {
      alert(e.message);
    }
  }

  handleFileChange(e) {
    if (e.target instanceof HTMLInputElement === false) {
      return;
    }

    if (e.target.files instanceof FileList) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.handleImportData(ev.target.result);
      };
      reader.readAsText(e.target.files[0]);
    }
  }

  render() {
    const {
      confirmImport,
    } = this.state;

    return (
      <Container>
        <Header as="h1">Settings</Header>

        <Header as="h3">Export / Import</Header>
        <Button color="blue" onClick={this.onExportData}>Export data</Button>
        <Button color="green" onClick={this.onImportData}>Import data</Button>
        <Confirm
          open={confirmImport}
          content="If you import data it will overwrite your current data. Wish to continue?"
          confirmButton="Import data"
          size="mini"
          onCancel={this.onCancelConfirm}
          onConfirm={this.onOpenImportInput}
        />

        <Header as="h3">Delete data</Header>
        <Button color="red" onClick={this.onRemoveTime}>Remove timesheet data</Button>
        <Button color="red" onClick={this.onRemoveProjects}>Remove project data</Button>

        <Header as="h3">About</Header>
        Thyme is a creation by <a href="https://theclevernode.com">Gaya Kessler</a>.
        It is <a href="https://github.com/Gaya/thyme">open source</a> and free to use.
        All your data is stored in your own browser.
        Issues / requests can be <a href="https://github.com/Gaya/thyme/issues">filed on Github</a>.
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { time, projects, reports } = state;

  return { time, projects, reports };
}

function mapDispatchToProps(dispatch) {
  return {
    removeTimeData() {
      dispatch(truncateTime());
    },

    removeProjectData() {
      dispatch(truncateProjects());
    },

    importData(data) {
      dispatch(importJSONData(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
