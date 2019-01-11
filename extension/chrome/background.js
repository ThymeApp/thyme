function onInstalled() {
  const start = +new Date();

  setInterval(() => {
    chrome.browserAction.setBadgeText({ text: `${Math.round((+new Date() - start) / 1000)}` });
  }, 1000);
}

function onMessage(request, sender, sendResponse) {
  console.log(request);

  if (request.type === 'test') {
    sendResponse('Cheers');
    sender.sendMessage({ hallo: 'test' });
  }

  if (request.type === 'sendState') {
    console.log(request, sender, sendResponse);
  }
}

chrome.runtime.onInstalled.addListener(onInstalled);
chrome.runtime.onMessage.addListener(onMessage);
chrome.runtime.onMessageExternal.addListener(onMessage);
