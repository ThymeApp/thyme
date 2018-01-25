// @flow

import React, { Component } from 'react';
import format from 'date-fns/format';
import { Table } from 'semantic-ui-react';

import { formatDuration, calculateDuration } from '../../core/thyme';
import { valueFromEventTarget } from '../../core/dom';

import DateInput from '../DateInput';
import TimeInput from '../TimeInput';
import ProjectInput from '../ProjectInput';
import NotesInput from '../NotesInput';

import add from './add.svg';
import remove from './remove.svg';

import './Entry.css';

function timeElapsed(from, to) {
  if (from === '' || to === '') {
    return 'Invalid time';
  }

  return formatDuration(calculateDuration(from, to));
}

function defaultState(props = {}): timePropertyType {
  return {
    date: format(props.date || new Date(), 'YYYY-MM-DD'),
    start: props.start || '00:00',
    end: props.end || '00:00',
    project: props.project || null,
    notes: props.notes || '',
  };
}

type EntryType = {
  entry?: timeType,
  onAdd?: (entry: timePropertyType) => void,
  onRemove?: (id: string) => void,
  onUpdate?: (entry: timePropertyType) => void,
};

type EntryStateType = timePropertyType;

class Entry extends Component<EntryType, EntryStateType> {
  constructor(props: EntryType) {
    super(props);

    this.onDateChange = e => this.onValueChange('date', valueFromEventTarget(e.target));
    this.onStartTimeChange = e => this.onValueChange('start', valueFromEventTarget(e.target));
    this.onEndTimeChange = e => this.onValueChange('end', valueFromEventTarget(e.target));
    this.onProjectChange =
        project => this.onValueChange('project', project === null ? null : project.value);
    this.onNotesChange = e => this.onValueChange('notes', valueFromEventTarget(e.target));

    this.onAddEntry = this.addEntry.bind(this);
    this.onRemoveEntry = this.removeEntry.bind(this);
    this.onKeyPress = this.keyPress.bind(this);

    this.onSetDateInputRef = (input) => { this.dateInput = input; };

    this.state = defaultState(props.entry);
  }

  onDateChange: (e: Event) => void;
  onStartTimeChange: (e: Event) => void;
  onEndTimeChange: (e: Event) => void;
  onProjectChange: (project: { value: string, label: string }) => void;
  onNotesChange: (e: Event) => void;
  onKeyPress: (e: KeyboardEvent) => void;
  onAddEntry: () => void;
  onRemoveEntry: () => void;
  onSetDateInputRef: (input: HTMLInputElement | null) => void;

  onValueChange(key: string, value: string | null) {
    this.updateEntry({
      [key]: value,
    });

    this.setState({
      [key]: value,
    });
  }

  dateInput: HTMLInputElement | null;

  addEntry() {
    const { onAdd } = this.props;

    if (typeof onAdd === 'function') {
      onAdd({
        ...this.state,
      });

      if (this.dateInput) {
        this.dateInput.focus();
      }

      this.setState(defaultState());
    }
  }

  updateEntry(newState: any) {
    const { entry, onUpdate } = this.props;

    if (typeof onUpdate === 'function' && entry && entry.id) {
      onUpdate({
        id: entry.id,
        ...this.state,
        ...newState,
      });
    }
  }

  keyPress(e: KeyboardEvent) {
    // check if return is pressed
    if (e.charCode && e.charCode === 13 && !this.props.entry) {
      this.addEntry();
    }
  }

  removeEntry() {
    const { entry, onRemove } = this.props;

    if (
      entry && entry.id &&
      typeof onRemove === 'function' &&
      window.confirm('Are you sure you want to delete this item?')
    ) {
      onRemove(entry.id);
    }
  }

  render() {
    const { entry } = this.props;
    const {
      date,
      start,
      end,
      project,
      notes,
    } = this.state;

    const hasId = Boolean(entry && !!entry.id);

    return (
      <Table.Row>
        <Table.Cell width={1}>
          <DateInput
            setRef={this.onSetDateInputRef}
            onKeyPress={this.onKeyPress}
            onChange={this.onDateChange}
            value={date}
          />
        </Table.Cell>
        <Table.Cell width={1}>
          <TimeInput onKeyPress={this.onKeyPress} onChange={this.onStartTimeChange} value={start} />
        </Table.Cell>
        <Table.Cell width={1}>
          <TimeInput onKeyPress={this.onKeyPress} onChange={this.onEndTimeChange} value={end} />
        </Table.Cell>
        <Table.Cell width={1}>
          {timeElapsed(start, end)}
        </Table.Cell>
        <Table.Cell width={3}>
          <ProjectInput value={project} handleChange={this.onProjectChange} />
        </Table.Cell>
        <Table.Cell>
          <NotesInput onKeyPress={this.onKeyPress} onChange={this.onNotesChange} value={notes} />
        </Table.Cell>
        <Table.Cell style={{ width: 1, paddingRight: 12 }}>
          {!hasId && (
            <button onClick={this.onAddEntry} className="ThymeEntry__button">
              <img className="ThymeEntry__button-image" src={add} alt="Add entry" />
            </button>
          )}
          {hasId && (
            <button onClick={this.onRemoveEntry} className="ThymeEntry__button">
              <img className="ThymeEntry__button-image" src={remove} alt="Remove entry" />
            </button>
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default Entry;
