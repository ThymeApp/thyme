// @flow

import { register as registerComponent } from 'register/component';
import { register as registerSettingsPanel } from 'register/settings';
import { registerColumn } from 'register/table';

import ProjectTableHeader from './components/Projects/ProjectTableHeader';
import ProjectHourlyRate from './components/Projects/ProjectHourlyRate';

import ProjectRatesSettings from './components/Settings/ProjectRatesSettings';

import ReportTableRow from './components/Reports/ReportTableRow';
import ReportTableTotal from './components/Reports/ReportTableTotal';

export default () => {
  // Projects page
  registerComponent('projects.tableheader.parent', 'RatesProjectsTableHeader', ProjectTableHeader);
  registerComponent('projects.tablerow.parent', 'RatesProjectsRateInput', ProjectHourlyRate);

  // Settings page
  registerSettingsPanel({
    url: 'project-rates',
    name: 'Project rates',
    content: ProjectRatesSettings,
  });

  // Reports page
  registerColumn('reports', {
    name: 'Total price',
    header: () => 'Total price',
    footer: ReportTableTotal,
    row: ReportTableRow,
    textAlign: 'right',
    collapsing: true,
    style: { whiteSpace: 'no-wrap' },
  });
};
