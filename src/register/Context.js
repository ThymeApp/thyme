// @flow

import { createContext } from 'react';
import type { Node } from 'react';

import { defaultState } from './Store';

import type { TableColumn } from './table';

export type ContextType = {
  settingsPanels: SettingsPanel[];
  components: {
    [name: string]: { key: string, render: Node }[];
  };
  columns: {
    [name: string]: TableColumn[];
  };
  hiddenColumns: {
    [name: string]: string[];
  };
};

const RegisterContext = createContext<ContextType>(defaultState);

export default RegisterContext;
