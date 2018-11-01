// @flow

import { registerInjectable } from 'core/injectableComponent';

import { registerSettingsItem } from 'sections/Settings/Settings';
import { registerTableColumn } from 'sections/Reports/Reports';

import ProjectTableHeader from './components/Projects/ProjectTableHeader';
import ProjectHourlyRate from './components/Projects/ProjectHourlyRate';

import ProjectRatesSettings from './components/Settings/ProjectRatesSettings';

import ReportTableHeader from './components/Reports/ReportTableHeader';
import ReportTableRow from './components/Reports/ReportTableRow';
import ReportTableTotal from './components/Reports/ReportTableTotal';

export default () => {
  // Projects page
  registerInjectable('projects.tableheader.parent', 'RatesProjectsTableHeader', ProjectTableHeader);
  registerInjectable('projects.tablerow.parent', 'RatesProjectsRateInput', ProjectHourlyRate);

  // Settings page
  registerSettingsItem({
    name: 'Project rates',
    content: ProjectRatesSettings(),
  });

  // Reports page
  registerTableColumn('ProjectRate', 'Total price');
  registerInjectable('reports.tableheader.total', 'ReportsRatesTableHeader', ReportTableHeader);
  registerInjectable('reports.tablerow.total', 'ReportsRatesTotal', ReportTableRow);
  registerInjectable('reports.tablefooter.total', 'ReportsRatesTotal', ReportTableTotal);
};
