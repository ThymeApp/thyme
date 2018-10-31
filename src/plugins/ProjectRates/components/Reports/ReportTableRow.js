// @flow

import React from 'react';
import { connect } from 'react-redux';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';

import { formatCurrency } from 'core/intl';

import { totalProjectPrice } from '../../helpers';

import { getRatesCurrency } from '../../selectors';

import type { ProjectRatesReportProject } from '../../types';

type ReportTableRowProps = {
  project: ProjectRatesReportProject;
  hideColumns: Array<string | null>;
};

function ReportTableRow({
  currency,
  project,
  hideColumns,
}: { currency: string } & ReportTableRowProps) {
  const showColumn = hideColumns.indexOf('ProjectRate') === -1;

  if (!showColumn) {
    return null;
  }

  return (
    <Table.Cell textAlign="right">
      {formatCurrency(currency, totalProjectPrice(project))}
    </Table.Cell>
  );
}

function mapDispatchToProps(state) {
  return {
    currency: getRatesCurrency(state),
  };
}

const EnhancedReportTableRow = connect(mapDispatchToProps)(ReportTableRow);

export default (props: ReportTableRowProps) => <EnhancedReportTableRow {...props} />;
