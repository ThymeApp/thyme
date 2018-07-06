// @flow

import React, { Component } from 'react';

import parse from 'date-fns/parse';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/start_of_week';
import subDays from 'date-fns/sub_days';
import endOfWeek from 'date-fns/end_of_week';
import subMonths from 'date-fns/sub_months';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

import { valueFromEventTarget } from '../../core/dom';

type ReportRangeType = {
  from: Date | string,
  to: Date | string,
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
    this.onWeekToDate = () => this.props.updateDateRange(
      subDays(new Date(), 7),
      new Date(),
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
  onWeekToDate: () => void;

  updateRange(key: 'from' | 'to', value: string) {
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
        <Button basic onClick={this.onWeekToDate}>
          Week to date
        </Button>
        <Button basic onClick={this.onLastMonth}>
          Last month
        </Button>

        <Input
          onChange={this.onUpdateFrom}
          type="date"
          value={format(from, 'YYYY-MM-DD')}
          name="from"
          size="small"
        />
        <span style={{ marginLeft: 6, marginRight: 6 }}>to</span>
        <Input
          onChange={this.onUpdateTo}
          type="date"
          value={format(to, 'YYYY-MM-DD')}
          name="to"
          size="small"
        />
      </div>
    );
  }
}

export default ReportRange;
