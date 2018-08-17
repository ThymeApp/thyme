// @flow
import React from 'react';

import { Input, Dropdown } from 'semantic-ui-react';

const options = [
  { key: 'up', text: 'Round up', value: 'up' },
  { key: 'down', text: 'Round down', value: 'down' },
  { key: 'automatic', text: 'Calculated rounding', value: 'automatic' },
];
type RoundingProps = {
  title: string,
  rounding: number,
  roundingDirection: string,
  onRoundingChange: (event: Event) => void,
  onRoundingDirectionChange: (event: Event, data: any) => void,
}

function Combo(props: RoundingProps) {
  const {
    title, rounding, roundingDirection, onRoundingChange, onRoundingDirectionChange,
  } = props;
  return (
    <Input
      title={title}
      type="number"
      size="small"
      value={rounding}
      onChange={onRoundingChange}
      label={(
        <Dropdown
          options={options}
          onChange={onRoundingDirectionChange}
          defaultValue={roundingDirection}
        />
)}
      labelPosition="left"
      placeholder="Duration rounding"
    />
  );
}

export default Combo;
