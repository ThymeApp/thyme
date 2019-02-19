// @flow

import React, { useState, useEffect } from 'react';

import store, { defaultState } from './Store';

import Context from './Context';

function RegisterProvider({ children }: any) {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const updateState = () => setState(store.getState());

    const unsubscribe = store.subscribe(updateState);
    updateState();

    return () => unsubscribe();
  }, []);

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
}

export default RegisterProvider;
