// const duration = (entry.end - entry.start) / 1000;
//
// const hours = Math.floor(duration / 3600).toString();
// const minutes = Math.floor((duration / 60) % 60).toString();
// const seconds = Math.floor(duration % 60).toString();

function onConnect(port) {
  function onChangeTimer(entry) {
    if (entry.tracking) {
      chrome.browserAction.setBadgeText({ text: '✔' });
    } else {
      chrome.browserAction.setBadgeText({ text: '' });
    }
  }

  function handleMessage(msg) {
    switch (msg.type) {
      case 'changeTimer':
        onChangeTimer(msg.entry);
        break;

      default:
        console.log('Unable to handle message', msg);
    }
  }

  port.onMessage.addListener(handleMessage);

  port.postMessage({ test: 'From extension' });
}

chrome.runtime.onConnectExternal.addListener(onConnect);
