// @flow

import React from 'react';
import addMinutes from 'date-fns/add_minutes';

import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';

import { formatTime, roundTime } from '../../../core/thyme';

const roundingIcon = {
  none: 'dont',
  round: 'arrows alternate vertical',
  ceil: 'angle up',
  floor: 'angle down',
};

const roundingOptions = [
  { text: 'No rounding', value: 'none' },
  { text: 'Nearest', value: 'round' },
  { text: 'Up', value: 'ceil' },
  { text: 'Down', value: 'floor' },
];

function roundingExample(amount: number, type: rounding) {
  if (type === 'none' || amount === 0) {
    return 'no automatic rounding';
  }

  const startTime = new Date(2018, 0, 1, 8);

  const diffDown = amount % 2 === 1 ? Math.floor(amount / 2) : (amount / 2) - 1;
  const diffUp = amount % 2 === 1 ? Math.ceil(amount / 2) : (amount / 2) + 1;

  const diffDownTime = addMinutes(startTime, diffDown);
  const diffUpTime = addMinutes(startTime, diffUp);

  const A = formatTime(diffDownTime);
  const B = formatTime(roundTime(amount, type, diffDownTime, startTime));
  const C = formatTime(diffUpTime);
  const D = formatTime(roundTime(amount, type, diffUpTime, startTime));

  if (type === 'ceil') {
    return `${A} becomes ${B}`;
  }

  if (type === 'floor') {
    return `${C} becomes ${D}`;
  }

  return `${A} becomes ${B} - ${C} becomes ${D}`;
}

type RoundingFieldType = {
  label: string;
  rounding: rounding;
  amount: number;
  onChangeRounding: (rounding: rounding) => void;
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
          placeholder="Select rounding for start time"
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
          additionLabel=""
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
      <Message compact info size="tiny">
        {roundingExample(amount, rounding)}
      </Message>
    </Form.Field>
  );
}

export default RoundingField;
