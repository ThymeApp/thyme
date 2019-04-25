// @flow

import React from 'react';
import { useSelector } from 'react-redux';

import { formatCurrency } from 'core/intl';

import { totalProjectPrice } from '../../helpers';

import { getRatesCurrency } from '../../selectors';

import type { ProjectRatesReportProject } from '../../types';

type ReportTableRowProps = {
  project: ProjectRatesReportProject;
};

function ReportTableRow({ project }: ReportTableRowProps) {
  const currency = useSelector(getRatesCurrency);

  return formatCurrency(currency, totalProjectPrice(project));
}

export default (project: ProjectRatesReportProject) => <ReportTableRow project={project} />;
