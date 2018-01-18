// @flow

import React from 'react';
import { connect } from 'react-redux';
import isThisWeek from 'date-fns/is_this_week';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';

import ThymeTable from '../components/ThymeTable';
import NewTime from '../components/ThymeTable/New';

type TimeType = {
  entries: Array<timeType>,
};

function thisWeek(entries) {
  return entries.filter(entry => isThisWeek(entry.date));
}

function Time({ entries }: TimeType) {
  return (
    <div>
      <h4>This week</h4>
      <ThymeTable entries={thisWeek(entries)} />
      <NewTime />
    </div>
  );
}

function mapStateToProps(state) {
  const { allIds, byId } = state.time;
  const entries = allIds.map(id => byId[id]);

  entries.sort((a, b) => {
    const aDate = `${a.date} ${a.start}`;
    const bDate = `${b.date} ${b.start}`;

    if (isBefore(aDate, bDate)) {
      return -1;
    }

    if (isAfter(aDate, bDate)) {
      return 1;
    }

    return 0;
  });

  return { entries };
}

export default connect(mapStateToProps)(Time);
