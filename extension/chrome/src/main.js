import React from 'react';
import ReactDOM from 'react-dom';

import ExtensionApp from './components/App';

ReactDOM.render(
  <ExtensionApp />,
  document.getElementById('content') || document.createElement('div'),
);
