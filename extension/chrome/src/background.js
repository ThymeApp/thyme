// @flow

/* eslint-disable quote-props */
const regularIcon = {
  '16': 'assets/icon-16x16.png',
  '48': 'assets/icon-48x48.png',
  '128': 'assets/icon-128x128.png',
};

const activeIcon = {
  '16': 'assets/icon-on-16x16.png',
  '48': 'assets/icon-on-48x48.png',
  '128': 'assets/icon-on-128x128.png',
};
/* eslint-enable */

let currentEntry = null;
let currentState: StateShape = {};

// talk to extension
let onChangeTimerListener: (entry?: any) => void = () => {};
let onChangeStateListener: (state: StateShape) => void = () => {};

// talk to site
const connectedClients: { [id: any]: any } = {};

function postMessage(msg: any) {
  Object.keys(connectedClients)
    .forEach(id => connectedClients[id].postMessage(msg));
}

function onConnectApp(port) {
  if (port.sender.url.indexOf(process.env.REACT_APP_TAB_URL) !== 0) {
    console.log('Connection from invalid source');
    return;
  }

  function onChangeState(state: StateShape) {
    // update current state
    currentState = state;
  }

  function onChangeTimer(entry) {
    if (entry.tracking) {
      window.chrome.browserAction.setBadgeText({ text: 'REC' });
    } else {
      window.chrome.browserAction.setBadgeText({ text: '' });
    }

    // update current entry
    currentEntry = entry;
    onChangeTimerListener(entry);
  }

  function handleMessage(msg) {
    switch (msg.type) {
      case 'changeTimer':
        onChangeTimer(msg.entry);
        break;

      case 'changeState':
        onChangeState(msg.state);
        break;

      default:
        console.error('Unable to handle message from app', msg);
    }
  }

  function handleDisconnect() {
    delete connectedClients[port.sender.tab.id];

    if (Object.keys(connectedClients).length === 0) {
      window.chrome.browserAction.setIcon({ path: regularIcon });

      // wipe state
      currentEntry = null;
      currentState = {};

      // clear popup data
      onChangeTimerListener(null);
      onChangeStateListener({});
    }
  }

  window.chrome.browserAction.setIcon({ path: activeIcon });

  port.onMessage.addListener(handleMessage);
  port.onDisconnect.addListener(handleDisconnect);

  port.postMessage({ type: 'connected' });

  connectedClients[port.sender.tab.id] = port;
}

function onConnectPopup(port) {
  function handleDisconnect() {
    onChangeTimerListener = () => {};
    onChangeStateListener = () => {};
  }

  port.onMessage.addListener(msg => postMessage(msg));
  port.onDisconnect.addListener(handleDisconnect);

  onChangeTimerListener = entry => port.postMessage({ type: 'changeTimer', entry });
  onChangeStateListener = state => port.postMessage({ type: 'changeState', state });

  onChangeTimerListener(currentEntry);
  onChangeStateListener(currentState);
}

window.chrome.runtime.onConnectExternal.addListener(onConnectApp);
window.chrome.extension.onConnect.addListener(onConnectPopup);

window.chrome.browserAction.setBadgeBackgroundColor({ color: '#ba2011' });
