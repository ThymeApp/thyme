// flow-typed signature: 8713338c67fa40055c04e8789f3b2b4e
// flow-typed version: 6992b9a3cb/mitt_v1.x.x/flow_>=v0.28.x

declare module 'mitt' {
  declare type EventHandler = (event?: any) => void;

  declare interface EventEmitter {
    on: (type: string, handler: EventHandler) => void,
    off: (type: string, handler: EventHandler) => void,
    emit: (type: string, event: any) => void,
  }

  declare module.exports: () => EventEmitter;
}
