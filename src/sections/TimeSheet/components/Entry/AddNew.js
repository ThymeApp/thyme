// @flow

import React, { useState } from 'react';
import classnames from 'classnames';

import format from 'date-fns/format';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import { formatTime } from 'core/intl';

import { useResponsive } from 'components/Responsive';

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
  const [isMobile] = useResponsive({ max: 'tablet' });

  const disabled = false;
  const endDateEnabled = false;
  const startTime = new Date(2019, 1, 13, 9, 0, 0);
  const endTime = new Date(2019, 1, 13, 11, 0, 0);

  const Buttons = isMobile ? (
    <Button.Group size="large" fluid>
      <Button
        icon={tracking ? 'pause' : 'play'}
        disabled={disabled}
        onClick={toggleTracking}
        color={tracking ? 'purple' : 'blue'}
        content={tracking ? 'Pause timer' : 'Start timer'}
      />
      <Button
        icon="add"
        disabled={disabled}
        color="grey"
        content="Add entry"
      />
    </Button.Group>
  ) : (
    <Button.Group size="small">
      <Popup
        inverted
        position="bottom center"
        trigger={(
          <Button
            icon={tracking ? 'pause' : 'play'}
            onClick={toggleTracking}
            color={tracking ? 'purple' : 'blue'}
            disabled={disabled}
          />
        )}
        content={tracking ? 'Pause timer' : 'Start timer'}
      />
      <Popup
        inverted
        position="bottom center"
        trigger={<Button icon="redo" disabled={tracking || disabled} />}
        content="Clear timer"
      />
      <Popup
        inverted
        position="bottom right"
        trigger={<Button icon="add" disabled={disabled} color="grey" />}
        content="Add this entry"
      />
    </Button.Group>
  );

  return (
    <div className={classnames('AddNew', { 'AddNew--tracking': tracking, 'AddNew--endDateEnabled': endDateEnabled })}>
      <section className="AddNew__DurationTime">
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
                  value={format(startTime, 'YYYY-MM-DD')}
                  onChange={() => {}}
                  onKeyPress={() => {}}
                  setRef={() => {}}
                  size="big"
                />
              </div>
            )}

            {tracking ? (
              <span className="AddNew__TimeValue ui big input">{formatTime(startTime)}</span>
            ) : (
              <TimeInput
                value={format(startTime, 'HH:mm')}
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
                  value={format(endTime, 'YYYY-MM-DD')}
                  onChange={() => {}}
                  onKeyPress={() => {}}
                  setRef={() => {}}
                  size="big"
                />
              </div>
            )}

            {tracking ? (
              <span className="AddNew__TimeValue ui big input">{formatTime(endTime)}</span>
            ) : (
              <TimeInput
                value={format(endTime, 'HH:mm')}
                onChange={() => {}}
                onKeyPress={() => {}}
                setRef={() => {}}
                size="big"
              />
            )}
          </section>
        </div>
      </section>

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

      <div className="AddNew__Actions">{Buttons}</div>
    </div>
  );
}

export default AddNew;
