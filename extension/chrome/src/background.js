let currentEntry = null;
let onChangeTimerListener = () => {};

function onConnectApp(port) {
  function onChangeTimer(entry) {
    if (entry.tracking) {
      chrome.browserAction.setBadgeText({ text: '…' });
    } else {
      chrome.browserAction.setBadgeText({ text: '' });
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

      default:
        console.error('Unable to handle message from app', msg);
    }
  }

  port.onMessage.addListener(handleMessage);

  port.postMessage({ test: 'From extension' });
}

function onConnectPopup(port) {
  function handleDisconnect() {
    onChangeTimerListener = () => {};
  }

  function handleMessage(msg) {
    switch (msg.type) {
      default:
        console.error('Unable to handle message from popup', msg);
    }
  }

  port.onMessage.addListener(handleMessage);
  port.onDisconnect.addListener(handleDisconnect);

  onChangeTimerListener = entry => port.postMessage({ type: 'changeTimer', entry });
  onChangeTimerListener(currentEntry);
}

chrome.runtime.onConnectExternal.addListener(onConnectApp);
chrome.extension.onConnect.addListener(onConnectPopup);
