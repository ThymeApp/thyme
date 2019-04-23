// @flow

import {
  extensionConnected,
  onChangeTimer,
  onChangeState,
  startTimer,
  stopTimer,
  receiveTimer,
  addEntry,
} from './events';

const extensionId = process.env.REACT_APP_CHROME_EXTENSION_ID;

const port = window.chrome.runtime.connect(extensionId);

function handleMessage(msg: { type: string } & any) {
  switch (msg.type) {
    case 'connected':
      extensionConnected();
      break;
    case 'changeTimer':
      receiveTimer(msg.entry);
      break;
    case 'startTimer':
      startTimer();
      break;
    case 'stopTimer':
      stopTimer();
      break;
    case 'addEntry':
      addEntry(msg.entry);
      break;
    default:
      // eslint-disable-next-line no-console
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

onChangeState((state) => {
  postMessage({
    type: 'changeState',
    state,
  });
});
