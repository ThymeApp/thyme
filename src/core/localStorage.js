// @flow

import debounce from 'lodash/debounce';

function loadItem(key: string): any | typeof undefined {
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

function saveItem(state: any, key): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    // silently fail
  }
}

function removeItem(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // silently fail
  }
}

export function loadState(): {} | typeof undefined {
  return loadItem('ThymeState');
}

export function saveState(state: storeShape): void {
  // persist everything but the app and form state
  saveItem({
    ...state,
    reports: {
      ...state.reports,
      filters: undefined,
      from: undefined,
      to: undefined,
    },
    app: undefined,
    form: undefined,
  }, 'ThymeState');
}

export function loadTemporaryItem(): tempTimePropertyType | typeof undefined {
  return loadItem('ThymeTempItem');
}

export function saveTemporaryItem(state: tempTimePropertyType): void {
  saveItem(state, 'ThymeTempItem');
}

export function clearTemporaryItem() {
  removeItem('ThymeTempItem');
}

export function saveOnStoreChange(store: ThymeStore) {
  // save changes from store to localStorage
  store.subscribe(debounce(() => {
    saveState(store.getState());
  }, 1000));
}
