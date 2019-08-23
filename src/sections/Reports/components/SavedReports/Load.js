// @flow

import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import { useSelector } from 'react-redux';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal/Modal';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm/Confirm';

import { useActions } from 'core/useActions';

import { alert } from 'actions/app';

import { getAllReports } from '../../selectors';
import { removeReport } from '../../actions';

import './Load.css';

type LoadProps = {
  history: RouterHistory;
  isOpen: boolean;
  onClose: () => void;
};

type ConfirmDelete = {
  [key: string]: boolean;
};

function Load({ history, isOpen, onClose }: LoadProps) {
  const [confirmDeleteOpened, setConfirmDeleteOpened] = useState<ConfirmDelete>({});
  const [dispatchRemoveReport, showAlert] = useActions([removeReport, alert]);

  const savedReports = useSelector(getAllReports);

  const openReport = useCallback((id: string) => {
    history.push(`/reports/${id}`);
    onClose();
  }, [history, onClose]);

  const onCancelConfirm = useCallback(() => setConfirmDeleteOpened({}), [setConfirmDeleteOpened]);

  const onRemoveReport = useCallback((id: string) => (e: Event) => {
    e.stopPropagation();

    setConfirmDeleteOpened({
      ...confirmDeleteOpened,
      [id]: true,
    });
  }, [confirmDeleteOpened, setConfirmDeleteOpened]);

  const confirmDelete = useCallback((report: ReportType) => (e: Event) => {
    e.stopPropagation();

    onCancelConfirm();
    dispatchRemoveReport(report.id);
    showAlert(`Removed report "${report.name}"`);
  }, [dispatchRemoveReport, showAlert, onCancelConfirm]);

  return (
    <Modal size="small" open={isOpen} onClose={onClose}>
      <Header content="Load Report" />
      <Modal.Content className="Reports__LoadTable">
        {savedReports.length === 0 && (
          <p style={{ padding: '1.5rem' }}>No saved reports yet.</p>
        )}

        {savedReports.length > 0 && (
          <Menu vertical>
            {savedReports.map((report) => (
              <Menu.Item key={report.id} onClick={() => openReport(report.id)}>
                {report.name}

                <Popup
                  inverted
                  position="top right"
                  trigger={(
                    <Button icon onClick={onRemoveReport(report.id)}>
                      <Icon name="remove" />
                    </Button>
                  )}
                  content="Remove this report"
                />

                <Confirm
                  open={confirmDeleteOpened[report.id]}
                  content="Are you sure you want to remove this report?"
                  confirmButton="Remove Report"
                  size="mini"
                  onCancel={onCancelConfirm}
                  onConfirm={confirmDelete(report)}
                />
              </Menu.Item>
            ))}
          </Menu>
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

export default withRouter<*>(Load);
