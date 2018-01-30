// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import subMonths from 'date-fns/sub_months';

import { updateDateRange } from '../../actions/reports';
import { valueFromEventTarget } from '../../core/dom';

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

    this.onToday = () => this.props.updateDateRange(new Date(), new Date());
    this.onThisWeek = () => this.props.updateDateRange(
      startOfWeek(new Date(), { weekStartsOn: 1 }),
      endOfWeek(new Date(), { weekStartsOn: 1 }),
    );
    this.onLastMonth = () => this.props.updateDateRange(
      subMonths(new Date(), 1),
      new Date(),
    );
  }

  onUpdateFrom: (e: Event) => void;
  onUpdateTo: (e: Event) => void;
  onToday: () => void;
  onThisWeek: () => void;
  onLastMonth: () => void;

  updateRange(key, value) {
    const from = key === 'from' ? value : this.props.from;
    const to = key === 'to' ? value : this.props.to;

    this.props.updateDateRange(parse(from), parse(to));
  }

  render() {
    const { from, to } = this.props;

    return (
      <div className="Report__period">
        <Button basic onClick={this.onToday}>
          Today
        </Button>
        <Button basic onClick={this.onThisWeek}>
          This week
        </Button>
        <Button basic onClick={this.onLastMonth}>
          Last month
        </Button>

        <Input
          onChange={this.onUpdateFrom}
          type="date"
          value={from}
          name="from"
          size="small"
        />
        <span style={{ marginLeft: 6, marginRight: 6 }}>to</span>
        <Input
          onChange={this.onUpdateTo}
          type="date"
          value={to}
          name="to"
          size="small"
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
