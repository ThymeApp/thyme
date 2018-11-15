// @flow

import React from 'react';

import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';

const roundingIcon = {
  none: 'dont',
  round: 'arrows alternate vertical',
  ceil: 'angle up',
  floor: 'angle down',
};

const roundingOptions = [
  { text: 'Disabled', value: 'none' },
  { text: 'Nearest', value: 'round' },
  { text: 'Up', value: 'ceil' },
  { text: 'Down', value: 'floor' },
];

type RoundingFieldType = {
  label: string,
  rounding: Rounding;
  amount: number;
  onChangeRounding: (rounding: Rounding) => void;
  onChangeAmount: (amount: number) => void;
};

function RoundingField({
  label,
  rounding,
  amount,
  onChangeRounding,
  onChangeAmount,
}: RoundingFieldType) {
  const amountOptions = [5, 10, 15, 30, 45, 60];

  return (
    <Form.Field>
      <label>{label}</label>
      <div className="Rounding-Container">
        <Dropdown
          placeholder="Select rounding"
          floating
          labeled
          button
          className="icon"
          value={rounding}
          icon={roundingIcon[rounding]}
          onChange={(e, { value }) => {
            onChangeRounding(value);
          }}
          options={roundingOptions}
        />
        <Dropdown
          search
          searchInput={{ type: 'number' }}
          compact
          selection
          allowAdditions
          additionLabel="Round to "
          value={amount}
          onChange={(e, { value }) => {
            const input = parseInt(value, 10);

            onChangeAmount(input > 0 ? input : 0);
          }}
          options={
            [
              amountOptions.indexOf(amount) === -1 ? amount : -1,
              ...amountOptions,
            ]
              .filter((i: number) => i > -1)
              .map((i: number) => ({
                key: i,
                text: `${i} minutes`,
                value: i,
              }))
          }
          placeholder="Round to amount of minutes"
        />
      </div>
    </Form.Field>
  );
}

export default RoundingField;
