// @flow

import { hasCapability } from 'sections/Account/selectors';

export const canAddRates = hasCapability('project_rates');
