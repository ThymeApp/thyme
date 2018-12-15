/* eslint-disable */

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    workbox.skipWaiting();
  }
});
