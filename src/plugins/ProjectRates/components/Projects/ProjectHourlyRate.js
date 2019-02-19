// @flow

import React from 'react';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';

import { valueFromEventTarget } from 'core/dom';
import { useMappedState } from 'core/useRedux';

import type { ProjectItemProps } from 'sections/Projects/components/ProjectsList/ProjectItem';

import { getRatesCurrencySign } from '../../selectors';

import type { ProjectWithRate, StoreShapeWithRates } from '../../types';

type ProjectHourlyRatePassedProps = {
  isMobile: boolean;
} & ProjectItemProps;

type ProjectHourlyRateProps = {
  project: ProjectWithRate;
} & ProjectHourlyRatePassedProps;

function ProjectHourlyRate({
  isMobile,
  project,
  onUpdateProject,
}: ProjectHourlyRateProps) {
  const currencySign = useMappedState(getRatesCurrencySign);

  return (
    <Table.Cell className="field">
      {isMobile && (
        <label>
          Hourly rate
        </label>
      )}
      <Input
        label={currencySign}
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
}

export default ProjectHourlyRate;
