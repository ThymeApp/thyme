import React, { Component } from 'react';

import { formatDuration, calculateDuration } from '../../core/thyme';

import TimeInput from '../TimeInput';

function timeElapsed(from, to) {
  if (from === '' || to === '') {
    return 'Invalid time';
  }

  return formatDuration(calculateDuration(from, to));
}

class Entry extends Component {
  constructor(props) {
    super(props);

    this.onStartTimeChange = (e) => this.onTimeChange('start', e.target.value);
    this.onEndTimeChange = (e) => this.onTimeChange('end', e.target.value);

    this.state = {
      start: '01:00',
      end: '03:40',
    };
  }

  onTimeChange(time, value) {
    this.setState({
      [time]: value,
    });
  }

  render() {
    const { start, end } = this.state;

    return (
      <tr>
        <td>Date</td>
        <td><TimeInput onChange={this.onStartTimeChange} value={start} /></td>
        <td><TimeInput onChange={this.onEndTimeChange} value={end} /></td>
        <td>{timeElapsed(start, end)}</td>
        <td>Project</td>
        <td>Notes</td>
      </tr>
    );
  }
}

export default Entry;
