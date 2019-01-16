const content = document.getElementById('content');

content.innerHTML = 'Hello';

function renderEntry(entry) {
  const duration = (entry.end - entry.start) / 1000;

  const hours = Math.floor(duration / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((duration / 60) % 60).toString().padStart(2, '0');
  const seconds = Math.floor(duration % 60).toString().padStart(2, '0');

  const html = `
  <section>
    ${hours}:${minutes}:${seconds}
  </section>
  `;

  content.innerHTML = html;
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
