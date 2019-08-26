// @flow

const isDebug = process.env.NODE_ENV !== 'production';

export function debugInfo(...args: any) {
  if (!isDebug) return;
  console.info(...args);
}

export function debugLog(...args: any) {
  if (!isDebug) return;
  console.log(...args);
}

export function debugTable(...args: any) {
  if (!isDebug) return;
  console.table(...args);
}

export function debugWarn(...args: any) {
  if (!isDebug) return;
  console.warn(...args);
}

export function debugError(...args: any) {
  if (!isDebug) return;
  console.error(...args);
}
