// @flow

import React from 'react';
import { connect } from 'react-redux';

import DateRange from '../components/DateRange';
import ThymeTable from '../components/ThymeTable';

import { getCurrentTimeEntries } from '../selectors/time';
import { getRounding } from '../selectors/settings';

type TimeType = {
  entries: Array<timeType>,
  rounding: {
    startTimeRounding?: {
      rounding: number,
      roundingDirection: string,
    },
    endTimeRounding?: {
      rounding: number,
      roundingDirection: string,
    },
  },
};

function Time({ entries, rounding }: TimeType) {
  return (
    <div style={{ paddingLeft: '1%', paddingRight: '1%' }}>
      <DateRange />
      <ThymeTable entries={entries} rounding={rounding} />
    </div>
  );
}

function mapStateToProps(state) {
  return { entries: getCurrentTimeEntries(state), rounding: getRounding(state) };
}

export default connect(mapStateToProps)(Time);
