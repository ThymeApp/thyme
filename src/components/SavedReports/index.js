// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import { addReport, removeReport } from '../../actions/reports';

import { getAllReports } from '../../selectors/reports';

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
  confirmDelete: {
    [key: string]: boolean;
  },
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

    this.onCancelConfirm = () => this.setState({ confirmDelete: {} });

    this.state = {
      name: '',
      confirmDelete: {},
    };
  }

  onAddReport: (e: Event) => void;
  onUpdateName: (e: Event) => void;
  onKeyPress: (e: KeyboardEvent) => void;
  onCancelConfirm: () => void;

  onRemoveReport = (id: string) => {
    this.setState({
      confirmDelete: {
        ...this.state.confirmDelete,
        [id]: true,
      },
    });
  };

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
    const { name, confirmDelete } = this.state;
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
                <Link className="ui basic button" to={`/reports/${report.id}`}>{report.name}</Link>

                <Popup
                  inverted
                  style={{ float: 'right' }}
                  trigger={(
                    <Button icon onClick={() => this.onRemoveReport(report.id)}>
                      <Icon name="remove" />
                    </Button>
                  )}
                  content="Remove this report"
                />

                <Confirm
                  open={confirmDelete[report.id]}
                  content="Are you are you want to remove this report?"
                  confirmButton="Remove report"
                  size="mini"
                  onCancel={this.onCancelConfirm}
                  onConfirm={() => {
                    this.onCancelConfirm();
                    this.props.removeReport(report.id);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { savedReports: getAllReports(state) };
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
