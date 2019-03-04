import { useEffect } from 'react';

const _paq = window._paq || []; // eslint-disable-line
const skipEnvs = ['development', 'test'];

const enabled = skipEnvs.indexOf(process.env.NODE_ENV) === -1;

export function trackPageview(pageName = '') {
  if (enabled) _paq.push(['trackPageView', pageName]);
}

export function trackEvent(category = '', action = '') {
  if (enabled) _paq.push(['trackEvent', category, action]);
}

export function useTrackPageview(pageName = '') {
  useEffect(() => trackPageview(pageName), []);
}
