// @flow

import React from 'react';
import { connect } from 'react-redux';

import DateRange from '../components/DateRange';
import ThymeTable from '../components/ThymeTable';

import { getCurrentTimeEntries } from '../selectors/time';

type TimeType = {
  entries: Array<timeType>,
};

function Time({ entries }: TimeType) {
  return (
    <div style={{ paddingLeft: '1%', paddingRight: '1%' }}>
      <DateRange />
      <ThymeTable entries={entries} />
    </div>
  );
}

function mapStateToProps(state) {
  return { entries: getCurrentTimeEntries(state) };
}

export default connect(mapStateToProps)(Time);
