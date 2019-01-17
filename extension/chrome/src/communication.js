function renderEntry(entry) {
  console.log(entry);

  if (!entry) {
    return;
  }

  const duration = (entry.end - entry.start) / 1000;

  const hours = Math.floor(duration / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((duration / 60) % 60).toString().padStart(2, '0');
  const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
}

function handleMessage(msg) {
  switch (msg.type) {
    case 'changeTimer':
      renderEntry(msg.entry);
      break;
    default:
      console.error('Unhandled message from background', msg);
  }
}

const port = chrome.extension.connect();
port.onMessage.addListener(handleMessage);
