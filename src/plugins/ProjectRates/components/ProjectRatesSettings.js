// @flow

import React from 'react';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

import { popular, other } from '../currencies';

const transformToOption = ([value, sign]) => ({
  text: `${value} - ${sign}`,
  value,
});

const currencyOptions = [
  { text: 'Popular currencies', value: 'popular', disabled: true },
  ...popular.map(transformToOption),
  { text: 'Other currencies', value: 'other', disabled: true },
  ...other.map(transformToOption),
];

function ProjectRatesSettings() {
  return (
    <Form>
      <Form.Field>
        <label>Currency for project rates</label>
        <Dropdown
          placeholder="Select preferred currency"
          fluid
          selection
          search
          value="EUR"
          options={currencyOptions}
        />
      </Form.Field>
    </Form>
  );
}

export default () => <ProjectRatesSettings />;
