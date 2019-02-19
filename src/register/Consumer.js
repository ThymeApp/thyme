// @flow

import React from 'react';

import RegisterContext from './Context';
import type { ContextType } from './Context';

export default function RegisterConsumer({ children }: { children: (items: ContextType) => any }) {
  return (
    <RegisterContext.Consumer>
      {(state: ContextType) => children(state)}
    </RegisterContext.Consumer>
  );
}
