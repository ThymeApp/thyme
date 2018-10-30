// @flow

import { registerInjectable } from 'core/injectableComponent';

import ProjectTableHeader from './components/ProjectTableHeader';
import ProjectHourlyRate from './components/ProjectHourlyRate';

export default () => {
  registerInjectable('projects.tableheader.parent', 'projectRatesTableHeader', ProjectTableHeader);
  registerInjectable('projects.tablerow.parent', 'projectRatesRateInput', ProjectHourlyRate);
};
