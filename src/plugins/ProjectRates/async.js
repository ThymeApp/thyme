// @flow

import registerReducers from './reducers';

export default function registerPlugin({ store }: { store: ThymeStore }) {
  registerReducers(store);
}
