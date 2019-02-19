// @flow

import React from 'react';
import RegisterContext from './Context';
import type { ContextType } from './Context';

export default function RegisterConsumer<T>(
  { propKey, children }: { propKey: string, children: (items: T) => any },
) {
  return (
    <RegisterContext.Consumer>
      {(state: ContextType) => children(state[propKey])}
    </RegisterContext.Consumer>
  );
}
