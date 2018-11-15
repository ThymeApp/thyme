// @flow

import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';
import React from 'react';

type RoundingOnProps = {
  roundingOn: RoundableOn;
  onChange: (RoundingOn: RoundableOn) => void;
};

function RoundingOn({ roundingOn, onChange }: RoundingOnProps) {
  const onChangeRounding = (e, { value }) => onChange(value);

  return (
    <Form.Group grouped>
      <Form.Field>
        <label>Round durations by</label>
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label="Individual entries"
          name="roundingOn"
          value="entries"
          checked={roundingOn === 'entries'}
          onChange={onChangeRounding}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          radio
          label="Report totals"
          name="roundingOn"
          value="reports"
          checked={roundingOn === 'reports'}
          onChange={onChangeRounding}
        />
      </Form.Field>
    </Form.Group>
  );
}

export default RoundingOn;
