// @flow

import store from './Store';
import type { UpdateActions } from './Store';

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
