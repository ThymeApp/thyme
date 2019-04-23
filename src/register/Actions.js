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

export function registerTableColumn(name: string, column: TableColumn) {
  dispatch({
    type: 'ADD_TABLE_COLUMN',
    name,
    column,
  });
}

export function toggleTableColumn(name: string, column: string) {
  dispatch({
    type: 'TOGGLE_TABLE_COLUMN',
    name,
    column,
  });
}
