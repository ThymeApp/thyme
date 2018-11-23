import { register as registerComponent } from 'register/component';

import Insights from './components/Insights';

export default () => {
  registerComponent('reports.afterCharts', 'ReportInsights', Insights);
};
