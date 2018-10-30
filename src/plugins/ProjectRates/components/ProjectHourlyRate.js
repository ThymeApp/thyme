// @flow

import React from 'react';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';

import { valueFromEventTarget } from 'core/dom';

import type { ProjectItemProps } from 'sections/Projects/components/ProjectsList/ProjectItem';

type ProjectHourlyRateProps = ProjectItemProps & {
  isMobile: boolean;
};

export default ({ isMobile, project, onUpdateProject }: ProjectHourlyRateProps) => (
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
      onChange={(e: Event) => {
        const rate = parseInt(valueFromEventTarget(e.target), 10);

        onUpdateProject({
          ...project,
          rate: Number.isNaN(rate) ? 0 : rate,
        });
      }}
    />
  </Table.Cell>
);
