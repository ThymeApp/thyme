// @flow

import { registerInjectable } from 'core/injectableComponent';

import { registerSettingsItem } from 'sections/Settings/Settings';

import ProjectTableHeader from './components/ProjectTableHeader';
import ProjectHourlyRate from './components/ProjectHourlyRate';
import ProjectRatesSettings from './components/ProjectRatesSettings';

export default () => {
  // Projects page
  registerInjectable('projects.tableheader.parent', 'projectRatesTableHeader', ProjectTableHeader);
  registerInjectable('projects.tablerow.parent', 'projectRatesRateInput', ProjectHourlyRate);

  // Settings page
  registerSettingsItem({
    name: 'Project rates',
    content: ProjectRatesSettings(),
  });
};
