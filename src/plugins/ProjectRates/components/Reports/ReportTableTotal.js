// @flow

import React from 'react';
import { connect } from 'react-redux';

import { formatCurrency } from 'core/intl';

import { totalProjectPrice } from '../../helpers';

import { getRatesCurrency } from '../../selectors';

import type { ProjectRatesReportProject } from '../../types';

type ReportTableTotalProps = {
  projects: ProjectRatesReportProject[];
};

function ReportTableTotal({
  currency,
  projects,
}: { currency: string } & ReportTableTotalProps) {
  return formatCurrency(
    currency,
    projects.reduce((acc, project) => acc + totalProjectPrice(project), 0),
  );
}

function mapDispatchToProps(state) {
  return {
    currency: getRatesCurrency(state),
  };
}

const EnhancedReportTableTotal = connect(mapDispatchToProps)(ReportTableTotal);

export default (projects: ProjectRatesReportProject[]) => (
  <EnhancedReportTableTotal projects={projects} />
);
