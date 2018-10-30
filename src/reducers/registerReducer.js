// @flow

type Reducer<T> = (state: T, action: any) => T;

const registeredReducers: { [path: string]: Reducer<any>[] } = {};

export function registerReducer(path: string, reducer: Reducer<any>) {
  if (!registeredReducers[path]) {
    registeredReducers[path] = [];
  }

  registeredReducers[path] = [
    ...registeredReducers[path],
    reducer,
  ];
}

export function createExtendableReducer(path: string, reducer: (state: any, action: any) => any) {
  return (state: any, action: any) => {
    const extraReducers = registeredReducers[path] || [];

    return {
      ...reducer(state, action),
      ...extraReducers.reduce((accState, r) => r(accState, action), state),
    };
  };
}
