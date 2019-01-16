// @flow

import { onChangeTimer } from './events';

const extensionId = 'ponekpfofmlkhibcjcigohaddamaiinm';

const connection = window.chrome.runtime.connect(extensionId);

onChangeTimer((timer) => {
  connection.postMessage({
    type: 'changeTimer',
    entry: timer,
  });
});

connection.onMessage.addListener((msg) => {
  console.log(msg);
});
