// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

import { updateDateRange } from '../../actions/reports';
import { valueFromEventTarget } from '../../core/dom';

import './ReportRange.css';

type ReportRangeType = {
  from: Date,
  to: Date,
  updateDateRange: (from: Date, to: Date) => void,
};

class ReportRange extends Component<ReportRangeType> {
  constructor() {
    super();

    this.onUpdateFrom = (e: Event) => this.updateRange('from', valueFromEventTarget(e.target));
    this.onUpdateTo = (e: Event) => this.updateRange('to', valueFromEventTarget(e.target));
  }

  onUpdateFrom: (e: Event) => void;
  onUpdateTo: (e: Event) => void;

  updateRange(key, value) {
    const from = key === 'from' ? value : this.props.from;
    const to = key === 'to' ? value : this.props.to;

    this.props.updateDateRange(parse(from), parse(to));
  }

  render() {
    const { from, to } = this.props;

    return (
      <div className="Report__period">
        <input
          className="Report__date-input"
          onChange={this.onUpdateFrom}
          type="date"
          value={from}
          name="from"
        />
        <span>to</span>
        <input
          className="Report__date-input"
          onChange={this.onUpdateTo}
          type="date"
          value={to}
          name="to"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { from, to } = state.reports;

  return {
    from: format(from, 'YYYY-MM-DD'),
    to: format(to, 'YYYY-MM-DD'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateDateRange(from, to) {
      dispatch(updateDateRange(from, to));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportRange);
