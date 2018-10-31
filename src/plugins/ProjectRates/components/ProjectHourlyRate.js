// @flow

import React from 'react';
import { connect } from 'react-redux';

import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';

import { valueFromEventTarget } from 'core/dom';

import type { ProjectItemProps } from 'sections/Projects/components/ProjectsList/ProjectItem';

import { getRatesCurrencySign } from '../selectors';

import type { ProjectWithRate, StoreShapeWithRates } from '../types';

type ProjectHourlyRatePassedProps = {
  isMobile: boolean;
} & ProjectItemProps;

type ProjectHourlyRateProps = {
  project: ProjectWithRate;
  currencySign: string;
} & ProjectHourlyRatePassedProps;

function mapStateToProps(state: StoreShapeWithRates) {
  return {
    currencySign: getRatesCurrencySign(state),
  };
}

function ProjectHourlyRate({
  isMobile,
  project,
  currencySign,
  onUpdateProject,
}: ProjectHourlyRateProps) {
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

const EnhancedProjectHourlyRate = connect(mapStateToProps)(ProjectHourlyRate);

export default (props: ProjectHourlyRatePassedProps) => (
  <EnhancedProjectHourlyRate {...props} />
);
