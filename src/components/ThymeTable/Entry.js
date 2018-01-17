import React, { Component } from 'react';
import format from 'date-fns/format';

import { formatDuration, calculateDuration } from '../../core/thyme';

import DateInput from '../DateInput';
import TimeInput from '../TimeInput';
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

class Entry extends Component {
  constructor(props) {
    super(props);

    this.onDateChange = (e) => this.onValueChange('date', e.target.value);
    this.onStartTimeChange = (e) => this.onValueChange('start', e.target.value);
    this.onEndTimeChange = (e) => this.onValueChange('end', e.target.value);
    this.onNotesChange = (e) => this.onValueChange('notes', e.target.value);

    this.onAddEntry = this.addEntry.bind(this);
    this.onRemoveEntry = this.removeEntry.bind(this);

    this.state = {
      date: format(props.date || new Date(), 'YYYY-MM-DD'),
      start: props.start || '00:00',
      end: props.end || '00:00',
      notes: props.notes || '',
    };
  }

  addEntry() {
    const { onAdd } = this.props;

    if (typeof onAdd === 'function') {
      onAdd({
        ...this.state,
      });
    }
  }

  removeEntry() {
    const { id, onRemove } = this.props;

    if (
      typeof onRemove === 'function' &&
      window.confirm('Are you sure you want to delete this item?')
    ) {
      onRemove(id);
    }
  }

  onValueChange(key, value) {
    const { onUpdate } = this.props;

    if (typeof onUpdate === 'function') {
      onUpdate({
        id: this.props.id,
        ...this.state,
        [key]: value,
      });
    }

    this.setState({
      [key]: value,
    });
  }

  render() {
    const { id } = this.props;
    const { date, start, end, notes } = this.state;

    return (
      <tr className="ThymeEntry">
        <td className="ThymeEntry__item ThymeEntry__item--date">
          <DateInput onChange={this.onDateChange} value={date} /></td>
        <td className="ThymeEntry__item ThymeEntry__item--start">
          <TimeInput onChange={this.onStartTimeChange} value={start} /></td>
        <td className="ThymeEntry__item ThymeEntry__item--end">
          <TimeInput onChange={this.onEndTimeChange} value={end} /></td>
        <td className="ThymeEntry__item ThymeEntry__item--duration">
          {timeElapsed(start, end)}</td>
        <td className="ThymeEntry__item ThymeEntry__item--project">
          Project</td>
        <td className="ThymeEntry__item ThymeEntry__item--notes">
          <NotesInput onChange={this.onNotesChange} value={notes} /></td>
        <td>
          {!id && (
            <button onClick={this.onAddEntry} className="ThymeEntry__button">
              <img className="ThymeEntry__button-image" src={add} alt="Add entry" />
            </button>
          )}
          {id && (
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
