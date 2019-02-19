// @flow

import { invoke } from 'thyme-connect';

import { registerSettingsPanel } from './Actions';

export function register(item: SettingsPanel) {
  registerSettingsPanel(item);
}

// register method on thyme-connect
invoke('registerSettingsPanel', register);
