// @flow

import React from 'react';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';

export default ({ hideColumns }: { hideColumns: Array<string | null>; }) => {
  const showColumn = hideColumns.indexOf('ProjectRate') === -1;

  if (!showColumn) {
    return null;
  }

  return (
    <Table.HeaderCell textAlign="right" width={2} style={{ whiteSpace: 'nowrap' }}>
      Total price
    </Table.HeaderCell>
  );
};
