// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Button, Confirm } from 'semantic-ui-react';
import FileSaver from 'file-saver';
import format from 'date-fns/format';

import { stateToExport, validData, parseImportData } from '../core/importExport';
import NumberInput from '../components/NumberInput';
import { valueFromEventTarget } from '../core/dom';

import { importJSONData, alert } from '../actions/app';
import { updateSetting } from '../actions/settings';
import { truncateTime } from '../actions/time';
import { truncateProjects } from '../actions/projects';

type SettingsType = {
  time: any,
  projects: any,
  reports: any,
  removeTimeData: () => void,
  removeProjectData: () => void,
  importData: (data: any) => void,
  alert: (message: string) => void,
  updateSetting: (name: string, value: string) => void,
};

type SettingsState = {
  confirmImport: boolean,
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

    this.onImportData = () => { this.setState({ confirmImport: true }); };
    this.onOpenImportInput = this.openImportInput.bind(this);

    this.onCancelConfirm = () => {
      this.setState({
        confirmImport: false,
        confirmRemoveTimesheet: false,
        confirmRemoveProjects: false,
      });
    };

    this.onExportData = this.exportData.bind(this);
    this.onChangeRounding = this.exportData.bind(this);

    // create file upload element
    const input = document.createElement('input');
    input.setAttribute('name', 'upload');
    input.setAttribute('type', 'file');

    input.addEventListener('change', this.handleFileChange.bind(this));

    this.uploadInput = input;

    this.state = {
      confirmImport: false,
      confirmRemoveTimesheet: false,
      confirmRemoveProjects: false,
    };
  }
  onChangeRounding: () => void;
  onRemoveTime: () => void;
  onConfirmRemoveTime: () => void;
  onRemoveProjects: () => void;
  onConfirmRemoveProjects: () => void;
  onExportData: () => void;
  onOpenImportInput: () => void;
  onImportData: () => void;
  onCancelConfirm: () => void;  

  onChangeRounding(event) {
    console.log(this.props)
    const roundValue = valueFromEventTarget(event.target);
    this.props.updateSetting('rounding', roundValue);
  }

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
        this.props.alert('The provided JSON is not a valid Thyme timesheet');
        return;
      }

      this.props.importData(importData);

      this.props.alert('Import successful');
    } catch (e) {
      this.props.alert(e.message);
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
      confirmRemoveTimesheet,
      confirmRemoveProjects,
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
        <Header as="h3">Rounding</Header>
        <NumberInput onChange={this.onChangeRounding} title="The minutes that the timer rounds to" />
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

    updateSetting(name, value) {
      dispatch(updateSetting(name, value));
    },

    alert(message: string) {
      dispatch(alert(message));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
