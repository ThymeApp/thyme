// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import type { Dispatch } from 'redux';

import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import { addReport, removeReport } from '../../../../actions/reports';

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
  onAddReport: (name: string, filters: Array<string>, from: Date, to: Date) => void,
  onRemoveReport: (id: string) => void,
};

type SaveReportsState = {
  name: string,
  confirmDelete: {
    [key: string]: boolean;
  },
};

class SavedReports extends Component<SavedReportsProps, SaveReportsState> {
  state = {
    name: '',
    confirmDelete: {},
  };

  onCancelConfirm = () => this.setState({ confirmDelete: {} });

  onUpdateName = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.updateName(e.target.value);
    }
  };

  onKeyPress = (e: KeyboardEvent) => {
    // check if return is pressed
    if (e.charCode && e.charCode === 13) {
      this.onAddReport(e);
    }
  };

  onRemoveReport = (id: string) => {
    const { confirmDelete } = this.state;

    this.setState({
      confirmDelete: {
        ...confirmDelete,
        [id]: true,
      },
    });
  };

  onAddReport = (e: Event) => {
    e.preventDefault();

    const {
      filters,
      from,
      to,
      onAddReport,
    } = this.props;
    const { name } = this.state;

    if (name === '') {
      return;
    }

    onAddReport(name, filters, from, to);

    this.updateName('');
  };

  updateName(name: string) {
    this.setState({ name });
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
          <Button onClick={this.onAddReport} color="blue">
            Save this report
          </Button>
        </form>

        {savedReports.length > 0 && (
          <Header>
            Saved reports
          </Header>
        )}

        {savedReports.length > 0 && (
          <div className="SavedReports__list">
            {savedReports.map(report => (
              <div
                className="SavedReports__report"
                key={report.id}
              >
                <Link className="ui basic button" to={`/reports/${report.id}`}>
                  {report.name}
                </Link>

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
                    const { onRemoveReport } = this.props;

                    this.onCancelConfirm();
                    onRemoveReport(report.id);
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

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    onAddReport(name: string, filters: Array<string>, from: Date, to: Date) {
      dispatch(addReport(name, filters, from, to));
    },

    onRemoveReport(id: string) {
      dispatch(removeReport(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedReports);
