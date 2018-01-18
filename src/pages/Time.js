// @flow

import React from 'react';
import { connect } from 'react-redux';

import ThymeTable from '../components/ThymeTable';
import NewTime from '../components/ThymeTable/New';

type TimeType = {
  entries: Array<timeType>,
};

function Time({ entries }: TimeType) {
  return (
    <div>
      <ThymeTable entries={entries} />
      <NewTime />
    </div>
  );
}

function mapStateToProps(state) {
  const { allIds, byId } = state.time;
  const entries = allIds.map(id => byId[id]);

  return { entries };
}

export default connect(mapStateToProps)(Time);
