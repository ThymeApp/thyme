// @flow

import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

import { isSyncing } from 'selectors/app';

import { hasPremium, isLoaded } from '../../selectors';

import './Status.css';

type ConnectionStates = 'connected' | 'syncing' | 'offline';

type StatusProps = {
  closePopup: () => void;
}

const selectors = (state) => ({
  connectionState: isSyncing(state) ? 'syncing' : 'connected',
  isPremium: hasPremium(state),
  loaded: isLoaded(state),
});

function Status({ closePopup }: StatusProps) {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const { connectionState, isPremium, loaded } = useSelector(selectors);

  useEffect(() => {
    closePopup();

    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, [closePopup]);

  const status: ConnectionStates = isOnline ? connectionState : 'offline';

  return (
    <div className={classnames('Status', { [`Status--${status}`]: loaded && isPremium })}>
      {!loaded && 'connecting'}
      {isPremium && (isOnline ? 'connected' : 'offline')}
      {loaded && !isPremium && (
        <>
          subscribe to sync
          <Icon name="caret down" />
        </>
      )}
    </div>
  );
}

export default Status;
