// @flow

import { useEffect } from 'react';

const _paq = window._paq || []; // eslint-disable-line
const skipEnvs = ['development', 'test'];

const enabled = skipEnvs.indexOf(process.env.NODE_ENV) === -1;

export function trackPageview(pageName: string = '') {
  if (enabled) _paq.push(['trackPageView', pageName]);
}

export function trackEvent(
  category: string = '',
  action: string = '',
  varName?: string,
  varValue?: string,
) {
  if (enabled) _paq.push(['trackEvent', category, action, varName, varValue]);
}

export function useTrackPageview(pageName: string = '') {
  useEffect(() => trackPageview(pageName), [pageName]);
}
