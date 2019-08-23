// flow-typed signature: 9c210c52cd1939f6a887b060a4d3c835
// flow-typed version: c6154227d1/mitt_v1.x.x/flow_>=v0.104.x

declare module 'mitt' {
  declare type EventHandler = (event?: any) => void;

  declare interface EventEmitter {
    on: (type: string, handler: EventHandler) => void,
    off: (type: string, handler: EventHandler) => void,
    emit: (type: string, event: any) => void,
  }

  declare module.exports: () => EventEmitter;
}
