// @flow

import React, { useCallback } from 'react';

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

import { valueFromEventTarget } from 'core/dom';

import './ReportRange.css';

type ReportRangeProps = {
  from: Date | string;
  to: Date | string;
  updateDateRange: (from: Date, to: Date) => void;
};

function useUpdateDateRange(from, to, updateDateRange) {
  return useCallback(() => updateDateRange(from, to), [from, to, updateDateRange]);
}

function ReportRange({ from, to, updateDateRange }: ReportRangeProps) {
  const updateRange = useCallback((key: 'from' | 'to', value: string) => {
    const newFrom = key === 'from' ? value : from;
    const newTo = key === 'to' ? value : to;

    updateDateRange(parse(newFrom), parse(newTo));
  }, [from, to, updateDateRange]);

  const onUpdateFrom = (e: Event) => updateRange('from', valueFromEventTarget(e.target));
  const onUpdateTo = (e: Event) => updateRange('to', valueFromEventTarget(e.target));

  const onToday = useUpdateDateRange(
    new Date(),
    new Date(),
    updateDateRange,
  );
  const onThisWeek = useUpdateDateRange(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
    endOfWeek(new Date(), { weekStartsOn: 1 }),
    updateDateRange,
  );
  const onWeekToDate = useUpdateDateRange(
    subDays(new Date(), 7),
    new Date(),
    updateDateRange,
  );
  const onThisMonth = useUpdateDateRange(
    startOfMonth(new Date()),
    endOfMonth(new Date()),
    updateDateRange,
  );
  const onLastMonth = useUpdateDateRange(
    subMonths(new Date(), 1),
    new Date(),
    updateDateRange,
  );

  return (
    <div className="ReportRange">
      <div className="ReportRange__Presets">
        <Button basic size="small" onClick={onToday}>
          Today
        </Button>
        <Button basic size="small" onClick={onThisWeek}>
          This week
        </Button>
        <Button basic size="small" onClick={onWeekToDate}>
          Week to date
        </Button>
        <Button basic size="small" onClick={onThisMonth}>
          This month
        </Button>
        <Button basic size="small" onClick={onLastMonth}>
          Last month
        </Button>
      </div>

      <div className="ReportRange__Input">
        <Input
          onChange={onUpdateFrom}
          type="date"
          value={format(from, 'YYYY-MM-DD')}
          name="from"
          size="mini"
        />
        <span style={{ marginLeft: 6, marginRight: 6 }}>
          to
        </span>
        <Input
          onChange={onUpdateTo}
          type="date"
          value={format(to, 'YYYY-MM-DD')}
          name="to"
          size="mini"
        />
      </div>
    </div>
  );
}

export default ReportRange;
