// @flow

import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';

import { valueFromEventTarget } from 'core/dom';

import type { ProjectItemProps } from 'sections/Projects/components/ProjectsList/ProjectItem';

import { getRatesCurrencySign } from '../../selectors';

import type { ProjectWithRate } from '../../types';

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
  const currencySign = useSelector(getRatesCurrencySign);

  const onChange = useCallback((e: Event) => {
    const rate = parseInt(valueFromEventTarget(e.target), 10);

    onUpdateProject({
      ...project,
      rate: Number.isNaN(rate) ? 0 : rate,
    });
  }, [project, onUpdateProject]);

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
        onChange={onChange}
      />
    </Table.Cell>
  );
}

export default ProjectHourlyRate;
