// @flow

import './socket';

const isFirefox = typeof window.InstallTrigger !== 'undefined';
const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

if (isChrome) {
  import('./chrome');
}

if (isFirefox) {
  import('./firefox');
}
