// @flow

import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import type { Dispatch } from 'redux';

import type { ContextType } from './Context';

import Context from './Context';

const defaultState: ContextType = {
  settingsPanels: [],
};

type AddSettingPanel = {
  key: 'settingsPanels';
  item: SettingsPanel;
};

export type UpdateActions = AddSettingPanel;
type StoreActions = UpdateActions & { type: 'UPDATE' };

export const store = createStore<ContextType, StoreActions, Dispatch<StoreActions>>(
  (state, action) => {
    if (!state) {
      return defaultState;
    }

    if (action.type === 'UPDATE') {
      return {
        ...state,
        [action.key]: [...state[action.key], action.item],
      };
    }

    return state;
  },
  defaultState,
);

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
