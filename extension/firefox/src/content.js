// @flow

declare var browser: any;

const port = browser.runtime.connect();

function postToPage(msg: { type: string } & any) {
  return window.postMessage({
    from: 'content',
    ...msg,
  }, '*');
}

port.onMessage.addListener(postToPage);

window.addEventListener('message', (event) => {
  if (
    event.source === window
    && event.data
    && event.data.type
    && event.data.from === 'page'
  ) {
    port.postMessage(event.data);
  }
});
