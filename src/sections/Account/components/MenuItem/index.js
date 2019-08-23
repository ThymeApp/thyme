// @flow

import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router';
import type { RouterHistory } from 'react-router';
import { useSelector } from 'react-redux';

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';

import { useActions } from 'core/useActions';

import { getLastSync } from 'selectors/app';

import { logout } from '../../actions';

import { isLoggedIn, hasPremium, isLoaded } from '../../selectors';

import Status from '../Status';
import Login from '../Login';

import './MenuItem.css';

type AccountProps = {
  history: RouterHistory;
}

const selectors = (state) => ({
  lastSync: getLastSync(state),
  loggedIn: isLoggedIn(state),
  showPremium: !hasPremium(state) && isLoaded(state),
});

function Account({ history }: AccountProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { loggedIn, showPremium, lastSync } = useSelector(selectors);
  const onLogout = useActions(logout);

  const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  const goToSettings = useCallback(() => {
    history.push('/account');
    handleClose();
  }, [history, handleClose]);

  const goToPremium = useCallback(() => {
    history.push('/premium');
    handleClose();
  }, [history, handleClose]);

  return (
    <Popup
      className="Account-PopUp"
      trigger={(
        <Button
          secondary={loggedIn}
          inverted={!loggedIn}
        >
          { !loggedIn && <Icon name="unlock" /> }
          { loggedIn ? <Status closePopup={handleClose} /> : 'Login' }
        </Button>
      )}
      open={isOpen}
      position="bottom right"
      on="click"
      onClose={handleClose}
      onOpen={handleOpen}
    >
      { loggedIn ? (
        <Menu vertical>
          {showPremium && (
            <Menu.Item name="premium" className="Account-BackUp">
              Syncing is disabled without premium subscription.

              <Button primary fluid onClick={goToPremium}>
                <Icon name="diamond" />
                Buy Premium
              </Button>
            </Menu.Item>
          )}
          <Menu.Item
            name="last-sync"
            style={{ lineHeight: '1.1em', backgroundColor: 'rgba(0, 0, 0, .02)' }}
          >
            <strong>Last sync: </strong>
            {distanceInWordsToNow(lastSync, { includeSeconds: true })}
            <span> ago</span>
          </Menu.Item>
          <Menu.Item
            name="settings"
            onClick={goToSettings}
          >
            Account settings
          </Menu.Item>
          <Menu.Item
            name="logout"
            onClick={onLogout}
          >
            Logout
          </Menu.Item>
        </Menu>
      ) : (
        <div className="Account-PopUp-Content">
          <Login goToRegister={goToPremium} />
        </div>
      )}
    </Popup>
  );
}

export default withRouter<*>(Account);
