// @flow

import React from 'react';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

import './ProjectColourPicker.css';

function ProjectColourPicker() {
  return (
    <Button basic compact className="ProjectColourPicker">
      <Label color="red" size="medium" />
      <Icon name="caret down" />
    </Button>
  );
}

export default ProjectColourPicker;
