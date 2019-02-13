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

  const endDateEnabled = false;
  const startTime = '09:00';
  const endTime = '11:00';

  return (
    <div className={classnames('AddNew', { 'AddNew--tracking': tracking, 'AddNew--endDateEnabled': endDateEnabled })}>
      {tracking && (
        <>
          <Icon
            name="stopwatch"
            size="large"
            color="blue"
          />
          <div className="AddNew__Duration">
            2:00:00
          </div>
        </>
      )}

      <div className="AddNew__Time">
        <section className="AddNew__TimeContainer">
          {!tracking && (
            <div className="AddNew__Date">
              <DateInput
                value="2019-02-13"
                onChange={() => {}}
                onKeyPress={() => {}}
                setRef={() => {}}
                size="big"
              />
            </div>
          )}

          {tracking ? (
            <span className="AddNew__TimeValue ui big input">{startTime}</span>
          ) : (
            <TimeInput
              value={startTime}
              onChange={() => {}}
              onKeyPress={() => {}}
              setRef={() => {}}
              size="big"
            />
          )}
        </section>

        <span className="AddNew__TimeSeparator">→</span>

        <section className="AddNew__TimeContainer">
          {!tracking && endDateEnabled && (
            <div className="AddNew__Date">
              <DateInput
                value="2019-02-14"
                onChange={() => {}}
                onKeyPress={() => {}}
                setRef={() => {}}
                size="big"
              />
            </div>
          )}

          {tracking ? (
            <span className="AddNew__TimeValue ui big input">{endTime}</span>
          ) : (
            <TimeInput
              value={endTime}
              onChange={() => {}}
              onKeyPress={() => {}}
              setRef={() => {}}
              size="big"
            />
          )}
        </section>
      </div>

      <div className="AddNew__Notes">
        <Input
          placeholder="What are you working on?"
          transparent
          size="big"
        />
      </div>

      <div className="AddNew__Project">
        <ProjectInput handleChange={() => {}} size="large" />
      </div>

      <div className="AddNew__Actions">
        <Button.Group size="small">
          <Button
            icon={tracking ? 'pause' : 'play'}
            onClick={toggleTracking}
            color={tracking ? 'purple' : 'blue'}
          />
          <Button icon="redo" disabled={tracking} />
          <Button icon="add" color="grey" />
        </Button.Group>
      </div>
    </div>
  );
}

export default AddNew;
