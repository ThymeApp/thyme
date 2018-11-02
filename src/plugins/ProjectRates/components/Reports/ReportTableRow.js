// @flow

import React from 'react';
import { connect } from 'react-redux';

import { formatCurrency } from 'core/intl';

import { totalProjectPrice } from '../../helpers';

import { getRatesCurrency } from '../../selectors';

import type { ProjectRatesReportProject } from '../../types';

type ReportTableRowProps = {
  project: ProjectRatesReportProject;
};

function ReportTableRow({
  currency,
  project,
}: { currency: string } & ReportTableRowProps) {
  return formatCurrency(currency, totalProjectPrice(project));
}

function mapDispatchToProps(state) {
  return {
    currency: getRatesCurrency(state),
  };
}

const EnhancedReportTableRow = connect(mapDispatchToProps)(ReportTableRow);

export default (project: ProjectRatesReportProject) => <EnhancedReportTableRow project={project} />;
