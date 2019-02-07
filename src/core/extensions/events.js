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

export function receiveTimer(entry: TempTimePropertyType, emitChange: boolean = true) {
  emitter.emit('receiveTimer', { entry, emitChange });
}

export function startTimer() {
  emitter.emit('startTimer');
}

export function stopTimer() {
  emitter.emit('stopTimer');
}

export function addEntry(entry: TimePropertyType) {
  emitter.emit('addEntry', entry);
}

export function userLogin() {
  emitter.emit('userLogin');
}

export function onStartTimer(cb: any) {
  emitter.on('startTimer', cb);
}

export function offStartTimer(cb: any) {
  emitter.off('startTimer', cb);
}

export function onStopTimer(cb: any) {
  emitter.on('stopTimer', cb);
}

export function offStopTimer(cb: any) {
  emitter.off('stopTimer', cb);
}

export function onAddEntry(cb: any) {
  emitter.on('addEntry', cb);
}

export function offAddEntry(cb: any) {
  emitter.off('addEntry', cb);
}

export function onReceiveTimer(cb: any) {
  emitter.on('receiveTimer', cb);
}

export function offReceiveTimer(cb: any) {
  emitter.off('receiveTimer', cb);
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

export function onUserLogin(cb: any) {
  emitter.on('userLogin', cb);
}

export function offUserLogin(cb: any) {
  emitter.off('userLogin', cb);
}
