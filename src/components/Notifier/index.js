// @flow

import React from 'react';

import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

import { useMappedState } from 'core/useRedux';

import { updateAvailable } from 'selectors/app';

import './style.css';

const reloadWindow = () => window.location.reload();

function Notifier() {
  const isUpdateAvailable = useMappedState(updateAvailable);

  if (!isUpdateAvailable) return null;

  return (
    <div className="Notifier">
      <Message compact info onClick={reloadWindow}>
        <Icon name="refresh" />
        New version available. Refresh the page to load.
      </Message>
    </div>
  );
}

export default Notifier;
