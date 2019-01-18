// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

import ExtensionApp from './components/App';

const store = createStore((
  state: StateShape = {},
  action: any,
) => (
  action.type === 'UPDATE' ? action.state : state
));

ReactDOM.render(
  <Provider store={store}>
    <ExtensionApp />
  </Provider>,
  document.getElementById('content') || document.createElement('div'),
);
