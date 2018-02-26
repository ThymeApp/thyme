// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Header } from 'semantic-ui-react';

import { addReport, removeReport } from '../../actions/reports';

import remove from './remove.svg';

import './SavedReports.css';

type SavedReportsProps = {
  filters: Array<string>,
  from: Date,
  to: Date,
  savedReports: Array<{
    id: string,
    name: string,
    filters: Array<string>,
    from: Date,
    to: Date,
  }>,
  addReport: (name: string, filters: Array<string>, from: Date, to: Date) => void,
  removeReport: (id: string) => void,
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

    this.onAddReport = (e: Event) => {
      e.preventDefault();
      this.addReport();
    };

    this.state = {
      name: '',
    };
  }

  onAddReport: (e: Event) => void;
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

  removeReport(id: string) {
    if (window.confirm('Are you are you want to remove this report?')) {
      this.props.removeReport(id);
    }
  }

  render() {
    const { name } = this.state;
    const { savedReports } = this.props;

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

        {savedReports.length > 0 && <Header>Saved reports</Header>}

        {savedReports.length > 0 && (
          <div className="SavedReports__list">
            {savedReports.map(report => (
              <div
                className="SavedReports__report"
                key={report.id}
              >
                {report.name}

                <button onClick={() => this.removeReport(report.id)} className="Report__button">
                  <img className="Report__button-image" src={remove} alt="Remove entry" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    filters,
    from,
    to,
    allIds,
    byId,
  } = state.reports;

  const savedReports = allIds.map(id => byId[id]);

  return {
    filters,
    from,
    to,
    savedReports,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addReport(name: string, filters: Array<string>, from: Date, to: Date) {
      dispatch(addReport(name, filters, from, to));
    },

    removeReport(id: string) {
      dispatch(removeReport(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedReports);
