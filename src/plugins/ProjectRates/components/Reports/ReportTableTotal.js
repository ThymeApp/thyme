// @flow

import React from 'react';
import { connect } from 'react-redux';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';

import { formatCurrency } from 'core/intl';

import { totalProjectPrice } from '../../helpers';

import { getRatesCurrency } from '../../selectors';

import type { ProjectRatesReportProject } from '../../types';

type ReportTableTotalProps = {
  projects: ProjectRatesReportProject[];
  hideColumns: Array<string | null>;
};

function ReportTableTotal({
  currency,
  projects,
  hideColumns,
}: { currency: string } & ReportTableTotalProps) {
  const showColumn = hideColumns.indexOf('ProjectRate') === -1;

  if (!showColumn) {
    return null;
  }

  return (
    <Table.HeaderCell textAlign="right">
      {formatCurrency(
        currency,
        projects.reduce((acc, project) => acc + totalProjectPrice(project), 0),
      )}
    </Table.HeaderCell>
  );
}

function mapDispatchToProps(state) {
  return {
    currency: getRatesCurrency(state),
  };
}

const EnhancedReportTableTotal = connect(mapDispatchToProps)(ReportTableTotal);

export default (props: ReportTableTotalProps) => <EnhancedReportTableTotal {...props} />;
