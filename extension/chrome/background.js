function onConnect(port) {
  port.onMessage.addListener((msg) => {
    console.log(msg);
  });

  port.postMessage({ test: 'From extension' });
}

chrome.runtime.onConnectExternal.addListener(onConnect);
