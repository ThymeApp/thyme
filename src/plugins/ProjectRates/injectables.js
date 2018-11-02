// @flow

import { register as registerComponent } from 'register/component';
import { register as registerSettingsPanel } from 'register/settings';

import { registerTableColumn } from 'sections/Reports/Reports';

import ProjectTableHeader from './components/Projects/ProjectTableHeader';
import ProjectHourlyRate from './components/Projects/ProjectHourlyRate';

import ProjectRatesSettings from './components/Settings/ProjectRatesSettings';

import ReportTableHeader from './components/Reports/ReportTableHeader';
import ReportTableRow from './components/Reports/ReportTableRow';
import ReportTableTotal from './components/Reports/ReportTableTotal';

export default () => {
  // Projects page
  registerComponent('projects.tableheader.parent', 'RatesProjectsTableHeader', ProjectTableHeader);
  registerComponent('projects.tablerow.parent', 'RatesProjectsRateInput', ProjectHourlyRate);

  // Settings page
  registerSettingsPanel({
    name: 'Project rates',
    content: ProjectRatesSettings(),
  });

  // Reports page
  registerTableColumn('ProjectRate', 'Total price');
  registerComponent('reports.tableheader.total', 'ReportsRatesTableHeader', ReportTableHeader);
  registerComponent('reports.tablerow.total', 'ReportsRatesTotal', ReportTableRow);
  registerComponent('reports.tablefooter.total', 'ReportsRatesTotal', ReportTableTotal);
};
