// @flow

import CreateApp from '../../app';

CreateApp(
  chrome.extension.connect,
  () => window.chrome.tabs.create({ url: process.env.REACT_APP_TAB_URL }),
);
