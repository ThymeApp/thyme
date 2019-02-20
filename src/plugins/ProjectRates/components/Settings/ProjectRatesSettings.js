// @flow

import React, { useCallback } from 'react';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

import { useMappedState, useDispatch } from 'core/useRedux';

import { popular, other } from '../../currencies';

import { getRatesCurrency } from '../../selectors';

import { updateCurrency } from '../../actions';

function transformToOption(currencies) {
  return Object.keys(currencies).map((value: string) => ({
    value,
    text: currencies[value] ? `${value} - ${currencies[value]}` : value,
  }));
}

const currencyOptions = [
  { text: 'Popular currencies', value: 'popular', disabled: true },
  ...transformToOption(popular),
  { text: 'Other currencies', value: 'other', disabled: true },
  ...transformToOption(other),
];

function ProjectRatesSettings() {
  const currency = useMappedState(getRatesCurrency);
  const onCurrencyChange = useCallback(useDispatch(dispatch => (e, data) => {
    dispatch(updateCurrency(data.value));
  }), []);

  return (
    <Form>
      <Form.Field style={{ maxWidth: 300 }}>
        <label>Currency for project rates</label>
        <Dropdown
          placeholder="Select preferred currency"
          fluid
          selection
          search
          value={currency}
          options={currencyOptions}
          onChange={onCurrencyChange}
        />
      </Form.Field>
    </Form>
  );
}

export default <ProjectRatesSettings />;
