// @flow

import CreateApp from '../../app';

CreateApp(
  () => browser.runtime.connect({ name: 'popup' }),
  () => browser.tabs.create({ url: process.env.REACT_APP_TAB_URL }),
);
