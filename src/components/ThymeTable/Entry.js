// @flow

import React, { Component } from 'react';
import format from 'date-fns/format';

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

  onValueChange(key: string, value: string | null) {
    this.updateEntry({
      [key]: value,
    });

    this.setState({
      [key]: value,
    });
  }

  keyPress(e: KeyboardEvent) {
    // check if return is pressed
    if (e.charCode && e.charCode === 13) {
      if (this.props.entry) {
        this.updateEntry();
      } else {
        this.addEntry();
      }
    }
  }

  addEntry() {
    const { onAdd } = this.props;

    if (typeof onAdd === 'function') {
      onAdd({
        ...this.state,
      });

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
      <tr className="ThymeEntry">
        <td className="ThymeEntry__item ThymeEntry__item--date">
          <DateInput onKeyPress={this.onKeyPress} onChange={this.onDateChange} value={date} />
        </td>
        <td className="ThymeEntry__item ThymeEntry__item--start">
          <TimeInput onKeyPress={this.onKeyPress} onChange={this.onStartTimeChange} value={start} />
        </td>
        <td className="ThymeEntry__item ThymeEntry__item--end">
          <TimeInput onKeyPress={this.onKeyPress} onChange={this.onEndTimeChange} value={end} />
        </td>
        <td className="ThymeEntry__item ThymeEntry__item--duration">
          {timeElapsed(start, end)}
        </td>
        <td className="ThymeEntry__item ThymeEntry__item--project">
          <ProjectInput value={project} handleChange={this.onProjectChange} />
        </td>
        <td className="ThymeEntry__item ThymeEntry__item--notes">
          <NotesInput onKeyPress={this.onKeyPress} onChange={this.onNotesChange} value={notes} />
        </td>
        <td>
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
        </td>
      </tr>
    );
  }
}

export default Entry;
