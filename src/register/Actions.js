// @flow

import { store } from './Provider';
import type { UpdateActions } from './Provider';

function dispatch(action: UpdateActions) {
  store.dispatch({
    ...action,
    type: 'UPDATE',
  });
}

export function registerSettingsPanel(item: SettingsPanel) {
  dispatch({ key: 'settingsPanels', item });
}
