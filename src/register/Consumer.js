// @flow

import React from 'react';

import RegisterContext from './Context';
import type { ContextType } from './Context';

export default function RegisterConsumer<T>(
  { propKey, children }: { propKey?: string, children: (items: T | ContextType) => any },
) {
  return (
    <RegisterContext.Consumer>
      {(state: ContextType) => children(propKey ? state[propKey] : state)}
    </RegisterContext.Consumer>
  );
}
