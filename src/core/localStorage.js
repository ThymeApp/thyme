// @flow

export function loadState(): {} | typeof undefined {
  try {
    const serializedState = localStorage.getItem('ThymeState');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState || '{}');
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export function saveState(state: {}): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('ThymeState', serializedState);
  } catch (e) {
    console.error(e);
  }
}
