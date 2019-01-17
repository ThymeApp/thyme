// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';

import ExtensionApp from './components/App';

ReactDOM.render(
  <ExtensionApp />,
  document.getElementById('content') || document.createElement('div'),
);
