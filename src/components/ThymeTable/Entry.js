import React, { Component } from 'react';
import format from 'date-fns/format';

import { formatDuration, calculateDuration } from '../../core/thyme';

import DateInput from '../DateInput';
import TimeInput from '../TimeInput';
import NotesInput from '../NotesInput';

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

    this.state = {
      date: format(new Date(), 'YYYY-MM-DD'),
      start: '00:00',
      end: '00:00',
      notes: '',
    };
  }

  onValueChange(time, value) {
    this.setState({
      [time]: value,
    });
  }

  render() {
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
      </tr>
    );
  }
}

export default Entry;
