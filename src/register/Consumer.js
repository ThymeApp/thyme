// @flow

import React, { useContext } from 'react';

import RegisterContext from './Context';

export function useRegisterConsumer(key?: string) {
  const context = useContext(RegisterContext);

  return key ? context[key] : context;
}

export default function RegisterConsumer({ children }: { children: (items: ContextType) => any }) {
  return (
    <RegisterContext.Consumer>
      {(state: ContextType) => children(state)}
    </RegisterContext.Consumer>
  );
}
