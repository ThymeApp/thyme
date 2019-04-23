// @flow

import React, { useMemo, useCallback, useRef } from 'react';
import classnames from 'classnames';

import parse from 'date-fns/parse';
import format from 'date-fns/format';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';

import { formatTime } from 'core/intl';
import { timeElapsed } from 'core/thyme';
import { valueFromEventTarget } from 'core/dom';

import { useResponsive } from 'components/Responsive';

import ProjectInput from 'sections/Projects/components/ProjectInput';

import DateInput from '../DateInput';
import TimeInput from '../TimeInput';

import './EditableEntry.css';

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
  /* eslint-disable react/no-unused-prop-types */
  onAdd?: (entry: TimePropertyType) => void;
  onSave?: () => void;
  onUpdate: (entry: TimeType | TimePropertyType, tracking: boolean) => void;
  onResetItem?: (newItem: boolean) => void;
  onAddNewProject?: (project: string, entry: TimeType | TimePropertyType) => string;
  onRemove?: (entry: TimeType | TimePropertyType) => void;
  /* eslint-enable */
};

function useFormattedTimes(entry) {
  return useMemo(() => {
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
}

function useEntryHandlers(props: EntryProps) {
  const {
    entry,
    tracking,
    isNew,
    enabledEndDate,
    onResetItem,
    onAdd,
    onUpdate,
    onAddNewProject,
    onSave,
  } = props;

  const dateInput = useRef(null);

  const resetItem = useCallback((newItem: boolean) => {
    if (onResetItem) onResetItem(newItem);
  }, [onResetItem]);

  const onClearItem = useCallback(() => resetItem(false), [resetItem]);

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
    if (e.key && e.key === 'Enter') {
      if (isNew) {
        onAddEntry();
      } else if (!isNew && onSave) {
        onSave();
      }
    }
  }, [onAddEntry, onSave, isNew]);

  const updateEntry = useCallback((newState: any) => {
    if (typeof onUpdate === 'function') {
      const updatedEntry = {
        ...entry,
        ...newState,
      };

      onUpdate(updatedEntry, !!tracking);
    }
  }, [entry, onUpdate, tracking]);

  const onDateChange = useCallback((key: 'start' | 'end' | 'both', value: string | null) => {
    if (!value) {
      return;
    }

    if (key === 'both') {
      const start = parse(`${value} ${format(entry.start, 'HH:mm')}`);
      const end = parse(`${value} ${format(entry.end, 'HH:mm')}`);

      updateEntry({
        start,
        end,
      });
    } else {
      updateEntry({
        [key]: parse(`${value} ${format(entry[key], 'HH:mm')}`),
      });
    }
  }, [entry, updateEntry]);

  const onStartDateChange = useCallback((value: string) => {
    // when end date is not manual, change both dates
    onDateChange(!enabledEndDate ? 'both' : 'start', value);
  }, [enabledEndDate, onDateChange]);

  const onEndDateChange = useCallback((value: string) => onDateChange('end', value), [onDateChange]);

  const onTimeChange = useCallback((key: string, value: string | null) => {
    if (!value) {
      return;
    }

    const [hours, minutes] = value.split(':');
    const newDate = setHours(
      setMinutes(
        entry[key],
        parseInt(minutes, 10),
      ),
      parseInt(hours, 10),
    );

    updateEntry({
      [key]: newDate,
    });
  }, [entry, updateEntry]);

  const onStartTimeChange = useCallback(
    (time: string) => onTimeChange('start', time),
    [onTimeChange],
  );

  const onEndTimeChange = useCallback(
    (time: string) => onTimeChange('end', time),
    [onTimeChange],
  );

  const onNotesChange = useCallback(
    (e: Event) => updateEntry({ notes: valueFromEventTarget(e.target) }),
    [updateEntry],
  );
  const onProjectChange = useCallback(
    (value: string | null) => updateEntry({ project: value }),
    [updateEntry],
  );

  const addNewProject = useMemo(() => {
    if (!onAddNewProject) {
      return undefined;
    }

    return (project: string) => {
      const newProject = project.trim();

      if (newProject === '') {
        return;
      }

      onAddNewProject(project, entry);
    };
  }, [entry, onAddNewProject]);

  return {
    dateInput,
    onAddEntry,
    onClearItem,
    onKeyPress,
    onStartDateChange,
    onEndDateChange,
    onStartTimeChange,
    onEndTimeChange,
    onNotesChange,
    onProjectChange,
    onAddNewProject: addNewProject,
  };
}

function EditableEntry(props: EntryProps) {
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
  } = props;

  const containerElement = useRef(null);

  const [isMobile] = useResponsive({ max: 'tablet', element: containerElement.current || null });
  const [isMiniTablet] = useResponsive({ min: 'miniTablet', element: containerElement.current || null });

  const [
    startTime,
    endTime,
    startDateFormatted,
    startTimeFormatted,
    endDateFormatted,
    endTimeFormatted,
  ] = useFormattedTimes(entry);

  const {
    dateInput,
    onAddEntry,
    onClearItem,
    onKeyPress,
    onStartDateChange,
    onEndDateChange,
    onStartTimeChange,
    onEndTimeChange,
    onNotesChange,
    onProjectChange,
    onAddNewProject,
  } = useEntryHandlers(props);

  const Buttons = useCallback(() => {
    if (isNew) {
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
            onClick={onAddEntry}
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
            trigger={<Button icon="add" onClick={onAddEntry} disabled={disabled} color="grey" />}
            content="Add this entry"
          />
        </Button.Group>
      );
    }

    return null;
  }, [isMobile, isNew, tracking, disabled, onAddEntry, onStart, onStop, onClearItem]);

  const duration = timeElapsed(startTime, endTime, tracking, true, round, roundAmount) || '0:00:00';

  return (
    <div
      className={classnames('EditableEntry', {
        'EditableEntry--tracking': tracking,
        'EditableEntry--endDateEnabled': enabledEndDate,
        'EditableEntry--minitablet': isMiniTablet,
        'EditableEntry--tablet': !isMobile,
      })}
      ref={containerElement}
    >
      <section className="EditableEntry__DurationTime">
        {tracking && (
          <>
            <Icon
              name="stopwatch"
              size="large"
              color="blue"
            />
            <div className="EditableEntry__Duration">
              {duration}
            </div>
          </>
        )}

        <div className="EditableEntry__Time">
          <section className="EditableEntry__TimeContainer">
            {!tracking && (
              <div className="EditableEntry__Date">
                <DateInput
                  setRef={dateInput}
                  value={startDateFormatted}
                  onChange={onStartDateChange}
                  onKeyPress={onKeyPress}
                  size="big"
                  disabled={disabled}
                />
              </div>
            )}

            {tracking ? (
              <span className="EditableEntry__TimeValue ui big input">{formatTime(startTime)}</span>
            ) : (
              <TimeInput
                value={startTimeFormatted}
                onChange={onStartTimeChange}
                disabled={disabled}
                onKeyPress={onKeyPress}
                size="big"
              />
            )}
          </section>

          <span className="EditableEntry__TimeSeparator">→</span>

          <section className="EditableEntry__TimeContainer">
            {!tracking && enabledEndDate && (
              <div className="EditableEntry__Date">
                <DateInput
                  value={endDateFormatted}
                  disabled={disabled}
                  onChange={onEndDateChange}
                  onKeyPress={onKeyPress}
                  size="big"
                />
              </div>
            )}

            {tracking ? (
              <span className="EditableEntry__TimeValue ui big input">{formatTime(endTime)}</span>
            ) : (
              <TimeInput
                value={endTimeFormatted}
                disabled={disabled}
                onChange={onEndTimeChange}
                onKeyPress={onKeyPress}
                size="big"
              />
            )}
          </section>
        </div>
      </section>

      {enabledNotes && (
        <div className="EditableEntry__Notes">
          <Input
            placeholder="What are you working on?"
            transparent
            size="big"
            value={entry.notes}
            disabled={disabled}
            onKeyPress={onKeyPress}
            onChange={onNotesChange}
          />
        </div>
      )}

      {enabledProjects && (
        <div className="EditableEntry__Project">
          <ProjectInput
            value={entry.project}
            handleChange={onProjectChange}
            onAddItem={onAddNewProject}
            size="large"
            disabled={disabled}
          />
        </div>
      )}

      <div className="EditableEntry__Actions">
        {Buttons()}
      </div>
    </div>
  );
}

export default EditableEntry;
