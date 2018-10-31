// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown';

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

type ProjectRatesSettingsProps = {
  currency: string;
  onCurrencyChange: (e: any, data: { value: string }) => void;
};

function ProjectRatesSettings({ currency, onCurrencyChange }: ProjectRatesSettingsProps) {
  return (
    <Form>
      <Form.Field>
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

function mapStateToProps(state) {
  return {
    currency: getRatesCurrency(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
  return {
    onCurrencyChange(e, data) {
      dispatch(updateCurrency(data.value));
    },
  };
}

const EnhancedProjectRatesSettings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectRatesSettings);

export default () => <EnhancedProjectRatesSettings />;
