// @flow

import mitt from 'mitt';
import getTime from 'date-fns/get_time';

const emitter = mitt();

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

export function onChangeTimer(cb: (data: TempTimePropertyType) => void) {
  emitter.on('changeTimer', (e: any) => cb(e));
}
