// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

import ExtensionApp from './components/App';

export default function CreateApp(
  connectToExtension: () => any,
  openTab: () => void,
) {
  const port = connectToExtension();

  const store = createStore((
    state: StateShape = {},
    action: any,
  ) => (
    action.type === 'UPDATE' ? action.state : state
  ));

  ReactDOM.render(
    <Provider store={store}>
      <ExtensionApp
        openTab={openTab}
        registerOnMessage={cb => port.onMessage.addListener(cb)}
        postMessage={msg => port.postMessage(msg)}
      />
    </Provider>,
    document.getElementById('content') || document.createElement('div'),
  );
}
