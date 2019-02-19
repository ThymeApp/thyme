// @flow

import { createContext } from 'react';

export type ContextType = {
  settingsPanels: SettingsPanel[];
};

const RegisterContext = createContext<ContextType>({
  settingsPanels: [],
});

export default RegisterContext;
