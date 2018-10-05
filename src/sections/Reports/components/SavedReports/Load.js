// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { RouterHistory } from 'react-router';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal/Modal';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm/Confirm';

import { alert } from 'actions/app';

import { getAllReports } from '../../selectors';
import { removeReport } from '../../actions';

import './Load.css';

type LoadProps = {
  history: RouterHistory;
  isOpen: boolean;
  onClose: () => void;
  savedReports: {
    id: string,
    name: string,
    filters: Array<string>,
    from: Date,
    to: Date,
  }[];
  onRemoveReport: (id: string) => void;
  showAlert: (message: string) => void;
};

type LoadState = {
  confirmDelete: {
    [key: string]: boolean;
  };
}

class Load extends Component<LoadProps, LoadState> {
  state = {
    confirmDelete: {},
  };

  onCancelConfirm = () => this.setState({ confirmDelete: {} });

  openReport = (id: string) => {
    const { history, onClose } = this.props;

    history.push(`/reports/${id}`);
    onClose();
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

  render() {
    const { isOpen, onClose, savedReports } = this.props;
    const { confirmDelete } = this.state;

    return (
      <Modal size="small" open={isOpen} onClose={onClose}>
        <Header content="Load Report" />
        <Modal.Content className="Reports__LoadTable">
          {savedReports.length === 0 && (
            <p>No saved reports yet.</p>
          )}

          {savedReports.length > 0 && (
            <Table striped unstackable>
              <Table.Body>
                {savedReports.map(report => (
                  <Table.Row key={report.id} className="Reports__LoadItem">
                    <Table.Cell>
                      <Button basic fluid onClick={() => this.openReport(report.id)}>
                        {report.name}
                      </Button>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Popup
                        inverted
                        position="top right"
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
                          const { onRemoveReport, showAlert } = this.props;

                          this.onCancelConfirm();
                          onRemoveReport(report.id);
                          showAlert(`Removed report "${report.name}"`);
                        }}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return { savedReports: getAllReports(state) };
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    onRemoveReport(id: string) {
      dispatch(removeReport(id));
    },
    showAlert(message: string) {
      dispatch(alert(message));
    },
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Load);
