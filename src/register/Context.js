// @flow

import { createContext } from 'react';

export type ContextType = {
  settingsPanels: SettingsPanel[];
  components: {
    [name: string]: { key: string, render: (...any) => any }[];
  };
};

const RegisterContext = createContext<ContextType>({
  settingsPanels: [],
  components: {},
});

export default RegisterContext;
