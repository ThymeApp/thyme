// @flow

import React from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import './ReportRange.css';

type ReportRangeType = {
  from: Date,
  to: Date,
};

function ReportRange({ from, to }: ReportRangeType) {
  return (
    <div className="Report__period">
      <input className="Report__date-input" type="date" value={from} name="from" />
      <span>to</span>
      <input className="Report__date-input" type="date" value={to} name="to" />
    </div>
  );
}

function mapStateToProps(state) {
  const { from, to } = state.reports;

  return {
    from: format(from, 'YYYY-MM-DD'),
    to: format(to, 'YYYY-MM-DD'),
  };
}

export default connect(mapStateToProps)(ReportRange);
