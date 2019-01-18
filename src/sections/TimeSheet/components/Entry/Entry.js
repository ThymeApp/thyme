// @flow

import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import isEqualObject from 'lodash/isEqual';

import format from 'date-fns/format';
import isEqual from 'date-fns/is_equal';
import startOfDay from 'date-fns/start_of_day';
import addDays from 'date-fns/add_days';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import parse from 'date-fns/parse';
import isBefore from 'date-fns/is_before';

import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

import { timeElapsed } from 'core/thyme';
import { valueFromEventTarget } from 'core/dom';

import Responsive from 'components/Responsive';

import ProjectInput from 'sections/Projects/components/ProjectInput';

import DateInput from '../DateInput';
import TimeInput from '../TimeInput';
import NotesInput from '../NotesInput';

import './Entry.css';

function defaultState(props = {}, now: Date): TimePropertyType {
  const defaultStart = startOfDay(now);

  return {
    start: props.start || defaultStart,
    end: props.end || defaultStart,
    project: props.project || null,
    notes: props.notes || '',
  };
}

type EntryProps = {
  now: Date;
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  entry?: TimeType;
  tempEntry?: TempTimePropertyType;
  controlledEntry?: TempTimePropertyType;
  round?: Rounding;
  roundAmount?: number;
  onInit?: (tracking: boolean, entry: TimePropertyType) => void;
  onResetItem?: (entry: TimePropertyType) => void;
  onUpdate?: (entry: TimePropertyType, tracking: boolean) => void;
  onRemove?: (id: string) => void;
  onAdd?: (entry: TimePropertyType) => void;
  onAddNewProject?: (project: string) => string;
};

type EntryState = {
  entry: TimePropertyType;
  tracking: boolean;
  confirm: boolean;
};

class Entry extends Component<EntryProps, EntryState> {
  constructor(props: EntryProps) {
    super(props);

    this.state = {
      entry: defaultState(props.entry || props.controlledEntry || props.tempEntry, props.now),
      tracking: (props.controlledEntry && props.controlledEntry.tracking)
        || (props.tempEntry && props.tempEntry.tracking)
        || false,
      confirm: false,
    };
  }

  componentDidMount() {
    const { onInit } = this.props;
    const { entry, tracking } = this.state;

    if (onInit) onInit(tracking, entry);

    this.tickInterval = setInterval(this.tickTimer.bind(this), 1000);
  }

  componentDidUpdate(prevProps: EntryProps) {
    const { controlledEntry } = this.props;

    if (controlledEntry && !isEqualObject(prevProps.controlledEntry, controlledEntry)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        tracking: controlledEntry.tracking,
        entry: {
          ...controlledEntry,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);
  }

  onStartDateChange = (e: Event) => {
    const { enabledEndDate } = this.props;

    const value = valueFromEventTarget(e.target);

    // when end date is not manual, change both dates
    this.onDateChange(!enabledEndDate ? 'both' : 'start', value);
  };

  onEndDateChange = (e: Event) => this.onDateChange('end', valueFromEventTarget(e.target));

  onStartTimeChange = (e: Event) => this.onTimeChange('start', valueFromEventTarget(e.target));

  onEndTimeChange = (e: Event) => this.onTimeChange('end', valueFromEventTarget(e.target));

  onProjectChange = (e: Event, project: { value: string | null, label: string }) => (
    this.onValueChange(
      'project',
      project === null ? null : project.value,
    )
  );

  onNotesChange = (e: Event) => this.onValueChange('notes', valueFromEventTarget(e.target));

  onAddNewProject = (e: Event, project: { value: string }) => this.addNewProject(project.value);

  onOpenConfirm = () => { this.setState({ confirm: true }); };

  onCancelConfirm = () => { this.setState({ confirm: false }); };

  onSetDateInputRef = (input: HTMLInputElement | null) => { this.dateInput = input; };

  onDateChange(key: 'start' | 'end' | 'both', value: string | null) {
    if (!value) {
      return;
    }

    const { entry } = this.state;

    if (key === 'both') {
      const start = parse(`${value} ${format(entry.start, 'HH:mm')}`);
      const end = parse(`${value} ${format(entry.end, 'HH:mm')}`);

      this.updateEntry({
        start,
        end,
      });

      this.setState({
        entry: {
          ...entry,
          start,
          end,
        },
      });
    } else {
      this.onValueChange(key, parse(`${value} ${format(entry[key], 'HH:mm')}`));
    }
  }

  onTimeChange(key: string, value: string | null) {
    if (!value) {
      return;
    }

    const { entry } = this.state;

    const [hours, minutes] = value.split(':');
    const newDate = setHours(
      setMinutes(
        entry[key],
        parseInt(minutes, 10),
      ),
      parseInt(hours, 10),
    );

    this.onValueChange(key, newDate);
  }

  onValueChange(key: string, value: string | Date | null) {
    this.updateEntry({
      [key]: value,
    });

    const { entry } = this.state;

    this.setState({
      entry: {
        ...entry,
        [key]: value,
      },
    });
  }

  onStartTimeTracking = () => {
    const { now, onUpdate } = this.props;
    const { entry } = this.state;

    const startTime = new Date();

    const isOldTempItem = isBefore(entry.start, addDays(now, -1));
    const isNewTempItem = isEqual(entry.start, startOfDay(now));

    const newEntry = {
      ...entry,
      start: isOldTempItem || isNewTempItem ? startTime : entry.start,
      end: startTime,
    };

    if (onUpdate) onUpdate(newEntry, true);

    this.setState({
      tracking: true,
      entry: newEntry,
    });
  };

  onStopTimeTracking = () => {
    const { entry } = this.state;
    const { onUpdate } = this.props;

    if (onUpdate) onUpdate(entry, false);

    this.setState({
      tracking: false,
    });
  };

  onAddEntry = () => {
    const { onAdd } = this.props;
    const { entry } = this.state;

    if (typeof onAdd === 'function') {
      onAdd({
        ...entry,
      });

      // put focus back on date input
      if (this.dateInput) {
        this.dateInput.focus();
      }

      this.resetItem();
    }
  };

  onKeyPress = (e: KeyboardEvent) => {
    const { entry } = this.props;
    // check if return is pressed
    if (e.key && e.key === 'Enter' && !entry) {
      this.onAddEntry();
    }
  };

  onRemoveEntry = () => {
    const { entry, onRemove } = this.props;

    // close the confirm
    this.onCancelConfirm();

    if (
      entry && entry.id
      && typeof onRemove === 'function'
    ) {
      onRemove(entry.id);
    }
  };

  onClearItem = () => {
    this.resetItem();
  };

  resetItem() {
    const { now, onResetItem } = this.props;

    const entry = defaultState({}, now);

    if (onResetItem) {
      // communicate reset of temporary item
      onResetItem(entry);
    }

    // update entry state
    this.setState({
      tracking: false,
      entry,
    });
  }

  updateEntry(newState: any) {
    const { entry, onUpdate } = this.props;
    const { entry: stateEntry, tracking } = this.state;

    if (typeof onUpdate === 'function') {
      if (entry && entry.id) {
        onUpdate({
          id: entry.id,
          ...stateEntry,
          ...newState,
        }, false);
      } else {
        onUpdate(stateEntry, tracking);
      }
    }
  }

  addNewProject(project: string) {
    const { onAddNewProject } = this.props;
    const { entry } = this.state;

    const newProject = project.trim();

    if (newProject === '') {
      return;
    }

    if (onAddNewProject) {
      this.setState({
        entry: {
          ...entry,
          project: onAddNewProject(project),
        },
      });
    }
  }

  tickTimer() {
    const { tracking, entry: stateEntry } = this.state;
    const { onUpdate } = this.props;

    if (tracking) {
      const entry = {
        ...stateEntry,
        end: new Date(),
      };

      if (onUpdate) onUpdate(entry, tracking);

      // update state of component
      this.setState({ entry });
    }
  }

  dateInput: HTMLInputElement | null;

  tickInterval: IntervalID;

  render() {
    const {
      entry,
      round,
      roundAmount,
      enabledNotes,
      enabledProjects,
      enabledEndDate,
    } = this.props;
    const {
      tracking,
      confirm,
      entry: stateEntry,
    } = this.state;
    const {
      start,
      end,
      project,
      notes,
    } = stateEntry;

    const hasId = Boolean(entry && !!entry.id);
    const [hours, minutes, seconds] = (
      timeElapsed(start, end, tracking, true, round, roundAmount)
      || '00:00:00'
    ).split(':');

    const size = window.innerWidth < 768 ? 'large' : 'small';

    const StartDate = (
      <DateInput
        setRef={this.onSetDateInputRef}
        onKeyPress={this.onKeyPress}
        onChange={this.onStartDateChange}
        size={size}
        value={format(start, 'YYYY-MM-DD')}
      />
    );

    const StartTime = (
      <TimeInput
        onKeyPress={this.onKeyPress}
        onChange={this.onStartTimeChange}
        size={size}
        value={format(start, 'HH:mm')}
      />
    );

    const EndDate = enabledEndDate ? (
      <DateInput
        setRef={this.onSetDateInputRef}
        onKeyPress={this.onKeyPress}
        onChange={this.onEndDateChange}
        size={size}
        value={format(end, 'YYYY-MM-DD')}
      />
    ) : null;

    const EndTime = (
      <TimeInput
        onKeyPress={this.onKeyPress}
        onChange={this.onEndTimeChange}
        size={size}
        value={format(end, 'HH:mm')}
      />
    );

    const Duration = (
      <Fragment>
        {hours}
        :
        {minutes}
        {tracking && (
          <Fragment>
            :
            {seconds}
          </Fragment>
        )}
      </Fragment>
    );

    const Project = enabledProjects ? (
      <ProjectInput
        value={project}
        size={size}
        onAddItem={this.onAddNewProject}
        handleChange={this.onProjectChange}
      />
    ) : null;

    const Notes = enabledNotes ? (
      <NotesInput
        size={size}
        onKeyPress={this.onKeyPress}
        onChange={this.onNotesChange}
        value={notes}
      />
    ) : null;

    const Actions = !hasId ? (
      <Responsive max="tablet">
        {maxTablet => (maxTablet ? (
          <Button.Group size="large" vertical>
            <Button
              icon
              color="blue"
              onClick={tracking ? this.onStopTimeTracking : this.onStartTimeTracking}
              labelPosition="left"
            >
              <Icon name={tracking ? 'pause' : 'play'} />
              {tracking ? 'Stop tracking time' : 'Start time tracking'}
            </Button>
            <Button
              className="EntrySubmit"
              icon
              onClick={this.onAddEntry}
              labelPosition="left"
            >
              <Icon name="add" />
              Add this entry
            </Button>
          </Button.Group>
        ) : (
          <Button.Group size="small">
            <Popup
              inverted
              trigger={(
                <Button
                  icon
                  color="blue"
                  onClick={tracking ? this.onStopTimeTracking : this.onStartTimeTracking}
                >
                  <Icon name={tracking ? 'pause' : 'play'} />
                </Button>
              )}
              content={tracking ? 'Stop tracking time' : 'Start time tracking'}
            />
            <Popup
              inverted
              trigger={(
                <Button
                  icon
                  disabled={tracking}
                  onClick={this.onClearItem}
                >
                  <Icon name="redo" />
                </Button>
              )}
              content="Clear this entry"
            />
            <Popup
              inverted
              trigger={(
                <Button
                  className="EntrySubmit"
                  icon
                  color="grey"
                  onClick={this.onAddEntry}
                >
                  <Icon name="add" />
                </Button>
              )}
              content="Add this entry"
            />
          </Button.Group>
        ))}
      </Responsive>
    ) : (
      <Responsive max="tablet">
        {maxTablet => (
          <Button.Group size={maxTablet ? 'large' : 'small'}>
            {maxTablet ? (
              <Button icon onClick={this.onOpenConfirm} labelPosition="left">
                <Icon name="remove" />
                Remove entry
              </Button>
            ) : (
              <Popup
                inverted
                trigger={(
                  <Button icon onClick={this.onOpenConfirm}>
                    <Icon name="remove" />
                  </Button>
                )}
                content="Remove this entry"
              />
            )}

            <Confirm
              open={confirm}
              content="Are you sure you want to remove this entry?"
              confirmButton="Remove entry"
              size="mini"
              onCancel={this.onCancelConfirm}
              onConfirm={this.onRemoveEntry}
            />
          </Button.Group>
        )}
      </Responsive>
    );

    const TableEntry = (
      <Table.Row className={classnames({ 'TableRow--tracking': tracking })}>
        <Table.Cell width={1}>{StartDate}</Table.Cell>
        <Table.Cell width={1}>{StartTime}</Table.Cell>
        {enabledEndDate && <Table.Cell width={1}>{EndDate}</Table.Cell>}
        <Table.Cell width={1}>{EndTime}</Table.Cell>
        <Table.Cell className="EntryDuration" width={1}>{Duration}</Table.Cell>
        {enabledProjects && <Table.Cell width={3}>{Project}</Table.Cell>}
        {enabledNotes && <Table.Cell className="EntryNotes">{Notes}</Table.Cell>}
        <Table.Cell textAlign="right" style={{ width: 1, whiteSpace: 'nowrap' }}>
          {Actions}
        </Table.Cell>
      </Table.Row>
    );

    const CompactEntry = (
      <Form className={classnames('Entry', { 'Entry--tracking': tracking })}>
        <div className="EntryDuration">
          <Icon name="stopwatch" color={tracking ? 'blue' : 'black'} />
          {Duration}
        </div>
        <Form.Group className="EntryDurationContainer">
          {enabledEndDate && (
            <label>Start</label>
          )}
          <Form.Field>
            {StartDate}
          </Form.Field>
          <Form.Field>
            {StartTime}
          </Form.Field>
          {!enabledEndDate && (
            <Form.Field>
              {EndTime}
            </Form.Field>
          )}
        </Form.Group>
        {enabledEndDate && (
          <Form.Group className="EntryDurationContainer">
            <label>End</label>
            <Form.Field>
              {EndDate}
            </Form.Field>
            <Form.Field>
              {EndTime}
            </Form.Field>
          </Form.Group>
        )}
        {Project}
        {Notes}
        {Actions}
      </Form>
    );

    return (
      <Responsive max="tablet">
        {maxTablet => (maxTablet ? CompactEntry : TableEntry)}
      </Responsive>
    );
  }
}

export default Entry;
