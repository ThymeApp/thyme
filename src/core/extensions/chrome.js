// @flow

import { extensionConnected, onChangeTimer, onChangeStore } from './events';

const extensionId = 'ponekpfofmlkhibcjcigohaddamaiinm';

const port = window.chrome.runtime.connect(extensionId);

function handleMessage(msg: any) {
  switch (msg.type) {
    case 'connected':
      extensionConnected();
      break;

    default:
      console.error('Unable to handle message from extension', msg);
  }
}

port.onMessage.addListener(handleMessage);

function postMessage(msg: { type: string } & any) {
  try {
    port.postMessage(msg);
  } catch (e) {
    // fail silently
  }
}

onChangeTimer((timer) => {
  postMessage({
    type: 'changeTimer',
    entry: timer,
  });
});

onChangeStore((state) => {
  postMessage({
    type: 'changeStore',
    state,
  });
});
