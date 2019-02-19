// @flow

import { store } from './Provider';
import type { UpdateActions } from './Provider';

function dispatch(action: UpdateActions) {
  store.dispatch(action);
}

export function registerSettingsPanel(item: SettingsPanel) {
  dispatch({ type: 'ADD_SETTINGS_PANEL', item });
}

export function registerComponent(name: string, key: string, renderProp: (...any) => any) {
  dispatch({
    type: 'ADD_COMPONENT',
    name,
    key,
    renderProp,
  });
}
