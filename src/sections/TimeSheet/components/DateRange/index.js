// @flow

import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';

import { useActions } from 'core/useActions';

import { changeDateRange } from '../../actions';

import { getDateRange } from '../../selectors';

type DateRangeProps = {
  vertical?: boolean;
};

function useToggleHandlers(onChangeDateRange: (dateRange: DateRanges) => void) {
  return {
    toggleToday: useCallback(() => { onChangeDateRange('today'); }, [onChangeDateRange]),
    toggleThisWeek: useCallback(() => { onChangeDateRange('week'); }, [onChangeDateRange]),
    toggleWeekToDate: useCallback(() => { onChangeDateRange('weekToDate'); }, [onChangeDateRange]),
    toggleLastMonth: useCallback(() => { onChangeDateRange('month'); }, [onChangeDateRange]),
    toggleOlder: useCallback(() => { onChangeDateRange('older'); }, [onChangeDateRange]),
  };
}

function DateRange({ vertical = false }: DateRangeProps) {
  const dateRange = useSelector(getDateRange);
  const onChangeDateRange = useActions(changeDateRange);

  const {
    toggleToday,
    toggleThisWeek,
    toggleWeekToDate,
    toggleLastMonth,
    toggleOlder,
  } = useToggleHandlers(onChangeDateRange);

  return (
    <Menu
      secondary
      vertical={vertical}
      style={{ marginBottom: 0 }}
    >
      <Menu.Item
        active={dateRange === 'today'}
        onClick={toggleToday}
      >
        Today
      </Menu.Item>
      <Menu.Item
        active={dateRange === 'week'}
        onClick={toggleThisWeek}
      >
        This week
      </Menu.Item>
      <Menu.Item
        active={dateRange === 'weekToDate'}
        onClick={toggleWeekToDate}
      >
        Week to date
      </Menu.Item>
      <Menu.Item
        active={dateRange === 'month'}
        onClick={toggleLastMonth}
      >
        Last month
      </Menu.Item>
      <Menu.Item
        active={dateRange === 'older'}
        onClick={toggleOlder}
      >
        Older
      </Menu.Item>
    </Menu>
  );
}

export default DateRange;
