// @flow

import React from 'react';

import { formatCurrency } from 'core/intl';
import { useMappedState } from 'core/useRedux';

import { totalProjectPrice } from '../../helpers';

import { getRatesCurrency } from '../../selectors';

import type { ProjectRatesReportProject } from '../../types';

type ReportTableRowProps = {
  project: ProjectRatesReportProject;
};

function ReportTableRow({ project }: ReportTableRowProps) {
  const currency = useMappedState(getRatesCurrency);

  return formatCurrency(currency, totalProjectPrice(project));
}

export default (project: ProjectRatesReportProject) => <ReportTableRow project={project} />;
