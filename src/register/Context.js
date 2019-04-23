// @flow

import { createContext } from 'react';

import { defaultState } from './Store';

const RegisterContext = createContext<ContextType>(defaultState);

export default RegisterContext;
