// @flow

import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

import format from 'date-fns/format';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import parse from 'date-fns/parse';

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

type EntryProps = {
  entry: TimeType | TimePropertyType;
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  onUpdate: (entry: TimeType | TimePropertyType, tracking: boolean) => void;
  disabled?: boolean;
  tracking?: boolean;
  isNew?: boolean;
  round?: Rounding;
  roundAmount?: number;
  onStart?: () => void;
  onStop?: () => void;
  onAdd?: (entry: TimePropertyType) => void;
  onResetItem?: (newItem: boolean) => void;
  onAddNewProject?: (project: string, entry: TimeType | TimePropertyType) => string;
  onRemove?: (entry: TimeType | TimePropertyType) => void;
};

type EntryState = {
  confirm: boolean;
};

class Entry extends Component<EntryProps, EntryState> {
  state = { confirm: false };

  onStartDateChange = (value: string) => {
    const { enabledEndDate } = this.props;

    // when end date is not manual, change both dates
    this.onDateChange(!enabledEndDate ? 'both' : 'start', value);
  };

  onEndDateChange = (value: string) => this.onDateChange('end', value);

  onStartTimeChange = (time: string) => this.onTimeChange('start', time);

  onEndTimeChange = (time: string) => this.onTimeChange('end', time);

  onProjectChange = (value: string | null) => (this.onValueChange('project', value));

  onNotesChange = (e: Event) => this.onValueChange('notes', valueFromEventTarget(e.target));

  onAddNewProject = (value: string) => this.addNewProject(value);

  onOpenConfirm = () => { this.setState({ confirm: true }); };

  onCancelConfirm = () => { this.setState({ confirm: false }); };

  onSetDateInputRef = (input: HTMLInputElement | null) => { this.dateInput = input; };

  onDateChange(key: 'start' | 'end' | 'both', value: string | null) {
    if (!value) {
      return;
    }

    const { entry } = this.props;

    if (key === 'both') {
      const start = parse(`${value} ${format(entry.start, 'HH:mm')}`);
      const end = parse(`${value} ${format(entry.end, 'HH:mm')}`);

      this.updateEntry({
        start,
        end,
      });
    } else {
      this.onValueChange(key, parse(`${value} ${format(entry[key], 'HH:mm')}`));
    }
  }

  onTimeChange(key: string, value: string | null) {
    if (!value) {
      return;
    }

    const { entry } = this.props;

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
  }

  onAddEntry = () => {
    const { entry, onAdd } = this.props;

    if (typeof onAdd === 'function') {
      onAdd(entry);

      // put focus back on date input
      if (this.dateInput) {
        this.dateInput.focus();
      }

      this.resetItem(true);
    }
  };

  onKeyPress = (e: KeyboardEvent) => {
    const { isNew } = this.props;
    // check if return is pressed
    if (e.key && e.key === 'Enter' && isNew) {
      this.onAddEntry();
    }
  };

  onRemoveEntry = () => {
    const { entry, onRemove } = this.props;

    // close the confirm
    this.onCancelConfirm();

    if (typeof onRemove === 'function') onRemove(entry);
  };

  onClearItem = () => {
    this.resetItem(false);
  };

  resetItem(newItem: boolean) {
    const { onResetItem } = this.props;

    if (onResetItem) onResetItem(newItem);
  }

  updateEntry(newState: any) {
    const { entry, tracking, onUpdate } = this.props;

    if (typeof onUpdate === 'function') {
      const updatedEntry = {
        ...entry,
        ...newState,
      };

      onUpdate(updatedEntry, !!tracking);
    }
  }

  addNewProject(project: string) {
    const { entry, onAddNewProject } = this.props;

    const newProject = project.trim();

    if (newProject === '') {
      return;
    }

    if (onAddNewProject) onAddNewProject(project, entry);
  }

  dateInput: HTMLInputElement | null;

  render() {
    const {
      entry,
      tracking,
      round,
      roundAmount,
      enabledNotes,
      enabledProjects,
      enabledEndDate,
      disabled,
      isNew,
      onStart,
      onStop,
      onAddNewProject,
    } = this.props;
    const { confirm } = this.state;

    const {
      start,
      end,
      project,
      notes,
    } = entry;

    const [hours, minutes, seconds] = (
      timeElapsed(start, end, tracking, true, round, roundAmount)
      || '00:00:00'
    ).split(':');

    const size = window.innerWidth < 768 ? 'large' : 'small';

    const StartDate = (
      <DateInput
        disabled={disabled}
        setRef={this.onSetDateInputRef}
        onKeyPress={this.onKeyPress}
        onChange={this.onStartDateChange}
        size={size}
        value={format(start, 'YYYY-MM-DD')}
      />
    );

    const StartTime = (
      <TimeInput
        disabled={disabled}
        onKeyPress={this.onKeyPress}
        onChange={this.onStartTimeChange}
        size={size}
        value={format(start, 'HH:mm')}
      />
    );

    const EndDate = enabledEndDate ? (
      <DateInput
        disabled={disabled}
        setRef={this.onSetDateInputRef}
        onKeyPress={this.onKeyPress}
        onChange={this.onEndDateChange}
        size={size}
        value={format(end, 'YYYY-MM-DD')}
      />
    ) : null;

    const EndTime = (
      <TimeInput
        disabled={disabled}
        onKeyPress={this.onKeyPress}
        onChange={this.onEndTimeChange}
        size={size}
        value={format(end, 'HH:mm')}
      />
    );

    const Duration = (
      <span className={classnames('Duration', { 'Duration--disabled': disabled })}>
        {hours}
        :
        {minutes}
        {tracking && (
          <Fragment>
            :
            {seconds}
          </Fragment>
        )}
      </span>
    );

    const Project = enabledProjects ? (
      <ProjectInput
        value={project}
        size={size}
        onAddItem={onAddNewProject && this.onAddNewProject}
        disabled={disabled}
        handleChange={this.onProjectChange}
      />
    ) : null;

    const Notes = enabledNotes ? (
      <NotesInput
        size={size}
        onKeyPress={this.onKeyPress}
        onChange={this.onNotesChange}
        disabled={disabled}
        value={notes}
      />
    ) : null;

    const Actions = isNew ? (
      <Responsive max="tablet">
        {maxTablet => (maxTablet ? (
          <Button.Group size="large" vertical>
            <Button
              icon
              color="blue"
              onClick={tracking ? onStop : onStart}
              disabled={disabled}
              labelPosition="left"
            >
              <Icon name={tracking ? 'pause' : 'play'} />
              {tracking ? 'Stop tracking time' : 'Start time tracking'}
            </Button>
            <Button
              className="EntrySubmit"
              icon
              onClick={this.onAddEntry}
              disabled={disabled}
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
                  disabled={disabled}
                  onClick={tracking ? onStop : onStart}
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
                  disabled={tracking || disabled}
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
                  disabled={disabled}
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
              <Button icon onClick={this.onOpenConfirm} disabled={disabled} labelPosition="left">
                <Icon name="remove" />
                Remove entry
              </Button>
            ) : (
              <Popup
                inverted
                trigger={(
                  <Button icon disabled={disabled} onClick={this.onOpenConfirm}>
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
      <Form className={classnames('Entry', { 'Entry--tracking': tracking })} disabled={disabled}>
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
