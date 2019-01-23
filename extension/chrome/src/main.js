// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

import ExtensionApp from './components/App';

const port = window.chrome.extension.connect();

const store = createStore((
  state: StateShape = {},
  action: any,
) => (
  action.type === 'UPDATE' ? action.state : state
));

ReactDOM.render(
  <Provider store={store}>
    <ExtensionApp
      registerOnMessage={cb => port.onMessage.addListener(cb)}
      postMessage={msg => port.postMessage(msg)}
    />
  </Provider>,
  document.getElementById('content') || document.createElement('div'),
);
