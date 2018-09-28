// @flow

import React, { Component } from 'react';

import parse from 'date-fns/parse';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import subDays from 'date-fns/sub_days';
import subMonths from 'date-fns/sub_months';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

import { valueFromEventTarget } from '../../core/dom';

import './ReportRange.css';

type ReportRangeType = {
  from: Date | string,
  to: Date | string,
  updateDateRange: (from: Date, to: Date) => void,
};

class ReportRange extends Component<ReportRangeType> {
  onUpdateFrom = (e: Event) => this.updateRange('from', valueFromEventTarget(e.target));

  onUpdateTo = (e: Event) => this.updateRange('to', valueFromEventTarget(e.target));

  onToday = () => {
    const { updateDateRange } = this.props;
    updateDateRange(new Date(), new Date());
  };

  onThisWeek = () => {
    const { updateDateRange } = this.props;

    updateDateRange(
      startOfWeek(new Date(), { weekStartsOn: 1 }),
      endOfWeek(new Date(), { weekStartsOn: 1 }),
    );
  };

  onWeekToDate = () => {
    const { updateDateRange } = this.props;

    updateDateRange(
      subDays(new Date(), 7),
      new Date(),
    );
  };

  onThisMonth = () => {
    const { updateDateRange } = this.props;

    updateDateRange(
      startOfMonth(new Date()),
      endOfMonth(new Date()),
    );
  };

  onLastMonth = () => {
    const { updateDateRange } = this.props;

    updateDateRange(
      subMonths(new Date(), 1),
      new Date(),
    );
  };

  updateRange(key: 'from' | 'to', value: string) {
    const { from, to, updateDateRange } = this.props;

    const newFrom = key === 'from' ? value : from;
    const newTo = key === 'to' ? value : to;

    updateDateRange(parse(newFrom), parse(newTo));
  }

  render() {
    const { from, to } = this.props;

    return (
      <div className="ReportRange">
        <div className="ReportRange__Presets">
          <Button basic size="small" onClick={this.onToday}>
            Today
          </Button>
          <Button basic size="small" onClick={this.onThisWeek}>
            This week
          </Button>
          <Button basic size="small" onClick={this.onWeekToDate}>
            Week to date
          </Button>
          <Button basic size="small" onClick={this.onThisMonth}>
            This month
          </Button>
          <Button basic size="small" onClick={this.onLastMonth}>
            Last month
          </Button>
        </div>

        <div className="ReportRange__Input">
          <Input
            onChange={this.onUpdateFrom}
            type="date"
            value={format(from, 'YYYY-MM-DD')}
            name="from"
            size="mini"
          />
          <span style={{ marginLeft: 6, marginRight: 6 }}>
            to
          </span>
          <Input
            onChange={this.onUpdateTo}
            type="date"
            value={format(to, 'YYYY-MM-DD')}
            name="to"
            size="mini"
          />
        </div>
      </div>
    );
  }
}

export default ReportRange;
