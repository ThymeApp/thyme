// @flow

import React from 'react';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';

type ProjectHourlyRateProps = {
  project: projectTreeType;
  isMobile: boolean;
};

export default ({ isMobile, project }: ProjectHourlyRateProps) => (
  <Table.Cell className="field">
    {isMobile && (
      <label>
        Hourly rate
      </label>
    )}
    <Input
      label="€"
      fluid
      type="number"
      placeholder="Project rate"
      value={project.rate || ''}
      onChange={console.log}
    />
  </Table.Cell>
);

// onChangeRate = (e: Event) => {
//   const { onUpdateProject } = this.props;
//
//   const rate = parseInt(valueFromEventTarget(e.target), 10);
//
//   onUpdateProject({
//     ...projectValues(this.props),
//     rate: Number.isNaN(rate) ? 0 : rate,
//   });
// };
