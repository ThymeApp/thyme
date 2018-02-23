// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';

import { addReport } from '../../actions/reports';

import './SavedReports.css';

type SavedReportsProps = {
  filters: Array<string>,
  from: Date,
  to: Date,
  addReport: (name: string, filters: Array<string>, from: Date, to: Date) => void,
};

type SaveReportsState = {
  name: string,
};

class SavedReports extends Component<SavedReportsProps, SaveReportsState> {
  constructor() {
    super();

    this.onUpdateName = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        this.updateName(e.target.value);
      }
    };

    this.onKeyPress = (e: KeyboardEvent) => {
      // check if return is pressed
      if (e.charCode && e.charCode === 13) {
        e.preventDefault();

        this.addReport();
      }
    };

    this.onAddReport = this.addReport.bind(this);

    this.state = {
      name: '',
    };
  }

  onAddReport: () => void;
  onUpdateName: (e: Event) => void;
  onKeyPress: (e: KeyboardEvent) => void;

  updateName(name: string) {
    this.setState({ name });
  }

  addReport() {
    const { filters, from, to } = this.props;
    const { name } = this.state;

    if (name === '') {
      return;
    }

    this.props.addReport(name, filters, from, to);

    this.updateName('');
  }

  render() {
    const { name } = this.state;

    return (
      <div className="SavedReports">
        <form className="SavedReports__new">
          <Input
            name="report-name"
            type="text"
            placeholder="Report name"
            value={name}
            onChange={this.onUpdateName}
            onKeyPress={this.onKeyPress}
            style={{ marginRight: 12 }}
          />
          <Button onClick={this.onAddReport} color="blue">Save this report</Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { filters, from, to } = state.reports;

  return { filters, from, to };
}

function mapDispatchToProps(dispatch) {
  return {
    addReport(name: string, filters: Array<string>, from: Date, to: Date) {
      dispatch(addReport(name, filters, from, to));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedReports);
