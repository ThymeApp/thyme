// @flow

import mitt from 'mitt';
import getTime from 'date-fns/get_time';

const emitter = mitt();

export function extensionConnected() {
  emitter.emit('extensionConnected');
}

export function changeTimer(entry: TempTimePropertyType) {
  emitter.emit(
    'changeTimer',
    {
      ...entry,
      start: getTime(entry.start),
      end: getTime(entry.end),
    },
  );
}

export function changeState(state: StateShape) {
  emitter.emit(
    'changeState',
    state,
  );
}

export function onChangeTimer(cb: (data: TempTimePropertyType) => void) {
  emitter.on('changeTimer', (e: any) => cb(e));
}

export function onChangeState(cb: (state: StateShape) => void) {
  emitter.on('changeState', (e: any) => cb(e));
}

export function onExtensionConnected(cb: () => void) {
  emitter.on('extensionConnected', cb);
}
