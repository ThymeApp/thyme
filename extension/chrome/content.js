function loadState(key) {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState || '{}');
  } catch (e) {
    return undefined;
  }
}

function sendMessage(action, cb = () => {}) {
  chrome.runtime.sendMessage(action, cb);
}
