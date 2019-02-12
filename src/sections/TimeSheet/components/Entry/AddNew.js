// @flow

import React, { useState } from 'react';
import classnames from 'classnames';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';

import ProjectInput from 'sections/Projects/components/ProjectInput';

import DateInput from '../DateInput';
import TimeInput from '../TimeInput';

import './AddNew.css';

function useTracking() {
  const [tracking, setTracking] = useState<boolean>(false);

  function toggleTracking() {
    setTracking(!tracking);
  }

  return [tracking, toggleTracking, setTracking];
}

function AddNew() {
  const [tracking, toggleTracking] = useTracking();

  return (
    <div className={classnames('AddNew', { 'AddNew--tracking': tracking })}>
      {tracking && (
        <Icon
          name="stopwatch"
          size="large"
          color="blue"
        />
      )}

      {!tracking && (
        <div className="AddNew__Date">
          <DateInput
            value="2019-02-12"
            onChange={() => {}}
            onKeyPress={() => {}}
            setRef={() => {}}
            size="big"
          />
        </div>
      )}

      {tracking && (
        <div className="AddNew__Duration">
          2:00:00
        </div>
      )}

      <div className="AddNew__Time">
        <TimeInput
          value="09:00"
          onChange={() => {}}
          onKeyPress={() => {}}
          setRef={() => {}}
          size="big"
        />
        <span className="AddNew__TimeSeparator">→</span>
        <TimeInput
          value="11:00"
          onChange={() => {}}
          onKeyPress={() => {}}
          setRef={() => {}}
          size="big"
        />
      </div>

      <div className="AddNew__Notes">
        <Input
          placeholder="What are you working on?"
          transparent
          size="big"
        />
      </div>

      <div className="AddNew__Project">
        <ProjectInput handleChange={() => {}} />
      </div>

      <div className="AddNew__Actions">
        <Button.Group size="small">
          <Button
            icon={tracking ? 'pause' : 'play'}
            onClick={toggleTracking}
            color={tracking ? 'green' : 'blue'}
          />
          <Button icon="redo" disabled={tracking} />
          <Button icon="add" color="grey" />
        </Button.Group>
      </div>
    </div>
  );
}

export default AddNew;
