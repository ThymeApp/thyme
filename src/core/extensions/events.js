// @flow

import mitt from 'mitt';

const emitter = mitt();

emitter.on('changeTimer', (e) => {
  console.log(e);
});

export function changeTimer(timer: TempTimePropertyType) {
  emitter.emit('changeTimer', timer);
}
