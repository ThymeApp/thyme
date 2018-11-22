// @flow

import mitt from 'mitt';
import { invoke } from 'thyme-connect';

const emitter = mitt();
const ADD_PANEL = 'settings.add.panel';

let extraSettingsItems: SettingsPanel[] = [];

export function register(item: SettingsPanel) {
  extraSettingsItems = [...extraSettingsItems, item];

  emitter.emit(ADD_PANEL);
}

export const items = () => extraSettingsItems;

export function listen(cb: any => any) {
  emitter.on(ADD_PANEL, cb);
}

export function unlisten(cb: any => any) {
  emitter.off(ADD_PANEL, cb);
}

// register method on thyme-connect
invoke('registerSettingsPanel', register);
