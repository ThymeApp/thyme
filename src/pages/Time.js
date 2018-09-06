// @flow

import React from 'react';
import { connect } from 'react-redux';

import DateRange from '../components/DateRange';
import DateSort from '../components/DateSort';
import ThymeTable from '../components/ThymeTable';

import { getCurrentTimeEntries } from '../selectors/time';

type TimeType = {
  entries: Array<timeType>,
  now?: Date,
};

function Time({ entries, now = new Date() }: TimeType) {
  return (
    <div style={{ paddingLeft: '1%', paddingRight: '1%' }}>
      <DateSort />
      <DateRange />
      <ThymeTable
        entries={entries}
        now={now}
      />
    </div>
  );
}

function mapStateToProps(state, props: TimeType) {
  const { now } = props;

  return { entries: getCurrentTimeEntries(now || new Date())(state) };
}

export default connect(mapStateToProps)(Time);
