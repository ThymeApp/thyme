// @flow
import React from 'react';

import { Input, Dropdown } from 'semantic-ui-react';

const options = [
  { key: '5', text: '5', value: '5' },
  { key: '10', text: '10', value: '10' },
  { key: '15', text: '15', value: '15' },
  { key: '30', text: '30', value: '30' },
  { key: '60', text: '60', value: '60' },
];
type RoundingProps = {
  title: string,
  rounding: string,
  onInputChange: (event: Event) => void,
  onDropDownChange: (event: Event, data: any) => void,
}

function Combo(props: RoundingProps) {
  return (
    <Input
      title={props.title}
      type="number"
      size="small"
      value={props.rounding}
      onChange={props.onInputChange}
      label={
        <Dropdown
          options={options}
          onChange={props.onDropDownChange}
          defaultValue={props.rounding}
        />
      }
      labelPosition="left"
      placeholder="Duration rounding"
    />
  );
}

export default Combo;
