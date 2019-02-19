// @flow

import React from 'react';

import { formatCurrency } from 'core/intl';
import { useMappedState } from 'core/useRedux';

import { totalProjectPrice } from '../../helpers';

import { getRatesCurrency } from '../../selectors';

import type { ProjectRatesReportProject } from '../../types';

type ReportTableTotalProps = {
  projects: ProjectRatesReportProject[];
};

function ReportTableTotal({ projects }: ReportTableTotalProps) {
  const currency = useMappedState(getRatesCurrency);

  return formatCurrency(
    currency,
    projects.reduce((acc, project) => acc + totalProjectPrice(project), 0),
  );
}

export default (projects: ProjectRatesReportProject[]) => (
  <ReportTableTotal projects={projects} />
);
