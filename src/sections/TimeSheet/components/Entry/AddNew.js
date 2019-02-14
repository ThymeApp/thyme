// @flow

import React, { useState, useMemo, useCallback, useRef } from 'react';
import classnames from 'classnames';

import parse from 'date-fns/parse';
import format from 'date-fns/format';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import { formatTime } from 'core/intl';
import { timeElapsed } from 'core/thyme';

import { useResponsive } from 'components/Responsive';

import ProjectInput from 'sections/Projects/components/ProjectInput';

import DateInput from '../DateInput';
import TimeInput from '../TimeInput';

import './AddNew.css';

type EntryProps = {
  entry: TimeType | TimePropertyType;
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  disabled?: boolean;
  tracking?: boolean;
  isNew?: boolean;
  round?: Rounding;
  roundAmount?: number;
  onStart?: () => void;
  onStop?: () => void;
  onAdd?: (entry: TimePropertyType) => void;
  onUpdate: (entry: TimeType | TimePropertyType, tracking: boolean) => void;
  onResetItem?: (newItem: boolean) => void;
  onAddNewProject?: (project: string, entry: TimeType | TimePropertyType) => string;
  onRemove?: (entry: TimeType | TimePropertyType) => void;
};

function AddNew(props: EntryProps) {
  const {
    entry,
    enabledNotes,
    enabledProjects,
    enabledEndDate,
    disabled,
    tracking,
    isNew,
    round,
    roundAmount,
    onStart,
    onStop,
    onAdd,
    onResetItem,
  } = props;

  const [isMobile] = useResponsive({ max: 'tablet' });

  const [
    startTime,
    endTime,
    startDateFormatted,
    startTimeFormatted,
    endDateFormatted,
    endTimeFormatted,
  ] = useMemo(() => {
    const parsedStartTime = parse(entry.start);
    const parsedEndTime = parse(entry.end);

    return [
      parsedStartTime,
      parsedEndTime,
      format(parsedStartTime, 'YYYY-MM-DD'),
      format(parsedStartTime, 'HH:mm'),
      format(parsedEndTime, 'YYYY-MM-DD'),
      format(parsedEndTime, 'HH:mm'),
    ];
  }, [entry.start, entry.end]);

  const dateInput = useRef(null);

  const resetItem = useCallback((newItem: boolean) => {
    if (onResetItem) onResetItem(newItem);
  }, [onResetItem]);

  const onClearItem = useCallback(() => resetItem(false), []);

  const onAddEntry = useCallback(() => {
    if (typeof onAdd === 'function') {
      onAdd(entry);

      // put focus back on date input
      if (dateInput && dateInput.current) {
        dateInput.current.focus();
      }

      resetItem(true);
    }
  }, [entry, onAdd, dateInput, resetItem]);

  const onKeyPress = useCallback((e: KeyboardEvent) => {
    // check if return is pressed
    if (e.key && e.key === 'Enter' && isNew) {
      onAddEntry();
    }
  }, []);

  const Buttons = useCallback(() => {
    if (!isNew) {
      return isMobile ? (
        <Button.Group size="large" fluid>
          <Button
            icon={tracking ? 'pause' : 'play'}
            disabled={disabled}
            onClick={tracking ? onStop : onStart}
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
                onClick={tracking ? onStop : onStart}
                color={tracking ? 'purple' : 'blue'}
                disabled={disabled}
              />
            )}
            content={tracking ? 'Pause timer' : 'Start timer'}
          />
          <Popup
            inverted
            position="bottom center"
            trigger={<Button icon="redo" onClick={onClearItem} disabled={tracking || disabled} />}
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
    }

    return 'older';
  }, [isMobile, isNew, tracking, disabled]);

  const duration = timeElapsed(startTime, endTime, tracking, true, round, roundAmount) || '0:00:00';

  return (
    <div className={classnames('AddNew', { 'AddNew--tracking': tracking, 'AddNew--endDateEnabled': enabledEndDate })}>
      <section className="AddNew__DurationTime">
        {tracking && (
          <>
            <Icon
              name="stopwatch"
              size="large"
              color="blue"
            />
            <div className="AddNew__Duration">
              {duration}
            </div>
          </>
        )}

        <div className="AddNew__Time">
          <section className="AddNew__TimeContainer">
            {!tracking && (
              <div className="AddNew__Date">
                <DateInput
                  setRef={dateInput}
                  value={startDateFormatted}
                  onChange={() => {}}
                  onKeyPress={onKeyPress}
                  size="big"
                />
              </div>
            )}

            {tracking ? (
              <span className="AddNew__TimeValue ui big input">{formatTime(startTime)}</span>
            ) : (
              <TimeInput
                value={startTimeFormatted}
                onChange={() => {}}
                onKeyPress={onKeyPress}
                size="big"
              />
            )}
          </section>

          <span className="AddNew__TimeSeparator">→</span>

          <section className="AddNew__TimeContainer">
            {!tracking && enabledEndDate && (
              <div className="AddNew__Date">
                <DateInput
                  value={endDateFormatted}
                  onChange={() => {}}
                  onKeyPress={onKeyPress}
                  size="big"
                />
              </div>
            )}

            {tracking ? (
              <span className="AddNew__TimeValue ui big input">{formatTime(endTime)}</span>
            ) : (
              <TimeInput
                value={endTimeFormatted}
                onChange={() => {}}
                onKeyPress={onKeyPress}
                size="big"
              />
            )}
          </section>
        </div>
      </section>

      {enabledNotes && (
        <div className="AddNew__Notes">
          <Input
            placeholder="What are you working on?"
            transparent
            size="big"
            value={entry.notes}
            disabled={disabled}
            onKeyPress={onKeyPress}
          />
        </div>
      )}

      {enabledProjects && (
        <div className="AddNew__Project">
          <ProjectInput
            value={entry.project}
            handleChange={() => {}}
            size="large"
            disabled={disabled}
          />
        </div>
      )}

      <div className="AddNew__Actions">
        {Buttons()}
      </div>
    </div>
  );
}

export default AddNew;
