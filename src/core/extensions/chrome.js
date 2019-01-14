// @flow

const extensionId = 'ponekpfofmlkhibcjcigohaddamaiinm';

const connection = window.chrome.runtime.connect(extensionId);
connection.postMessage({ test: 'From app' });

connection.onMessage.addListener((msg) => {
  console.log(msg);
});
