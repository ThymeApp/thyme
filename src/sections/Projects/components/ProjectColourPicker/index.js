// @flow

import React, { useState } from 'react';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import { coloursSorted, colourValue } from '../../colours';

import './ProjectColourPicker.css';

type ProjectColourPickerProps = {
  colour: ProjectColour;
  onChange: (colour: ProjectColour) => void;
};

function ProjectColourPicker({ colour, onChange }: ProjectColourPickerProps) {
  const [isOpened, setOpened] = useState<boolean>(false);

  return (
    <Popup
      className="ProjectColourPicker__Popup"
      open={isOpened}
      onClose={() => setOpened(false)}
      onOpen={() => setOpened(true)}
      trigger={(
        <Button basic compact className="ProjectColourPicker">
          <Label color={colourValue(colour)} size="medium" />
          <Icon name="caret down" />
        </Button>
      )}
      position="bottom left"
      on="click"
      content={coloursSorted.map((c) => (
        <Button
          className={c === colour ? 'selected' : ''}
          key={c}
          color={colourValue(c)}
          onClick={() => {
            onChange(c);
            setOpened(false);
          }}
        />
      ))}
    />
  );
}

export default ProjectColourPicker;
