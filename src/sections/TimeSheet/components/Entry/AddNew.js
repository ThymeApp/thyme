// @flow

import React from 'react';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

import './AddNew.css';

function AddNew() {
  return (
    <div className="AddNew">
      <div className="AddNew__Date">
        12 / 02 / 2019
      </div>
      <div className="AddNew__Time">
        <span className="AddNew__TimeInput">
          09:00
        </span>
        →
        <span className="AddNew__TimeInput">
          11:00
        </span>
      </div>

      <div className="AddNew__Notes">
        <Input
          placeholder="What are you working on?"
          transparent
        />
      </div>

      <div className="AddNew__Project">
        <Button content="Select project" icon="briefcase" />
        {/* <Button color="grey" content="Super Secret Project" /> */}
      </div>

      <div className="AddNew__Actions">
        <Button.Group size="small">
          <Button icon="play" color="blue" />
          <Button icon="redo" />
          <Button icon="add" color="grey" />
        </Button.Group>
      </div>
    </div>
  );
}

export default AddNew;
