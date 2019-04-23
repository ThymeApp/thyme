// @flow

import {
  addEntry,
  extensionConnected, onChangeState, onChangeTimer,
  receiveTimer,
  startTimer,
  stopTimer,
} from './events';

function postToExtension(msg: { type: string } & any) {
  return window.postMessage({
    from: 'page',
    ...msg,
  }, '*');
}

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

window.addEventListener('message', (event) => {
  if (
    event.source === window
    && event.data
    && event.data.type
    && event.data.from === 'content'
  ) {
    handleMessage(event.data);
  }
});

onChangeTimer((timer) => {
  postToExtension({
    type: 'changeTimer',
    entry: timer,
  });
});

onChangeState((state) => {
  postToExtension({
    type: 'changeState',
    state,
  });
});
