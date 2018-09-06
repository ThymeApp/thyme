// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';

import { changeDateRange } from '../../actions/time';

import { getDateRange } from '../../selectors/time';

type DateRangeProps = {
  vertical: boolean;
  dateRange: dateRanges;
  changeDateRange: (dateRange: dateRanges) => void;
};

class DateRange extends Component<DateRangeProps> {
  constructor(props) {
    super(props);

    this.toggleToday = () => { props.changeDateRange('today'); };
    this.toggleThisWeek = () => { props.changeDateRange('week'); };
    this.toggleWeekToDate = () => { props.changeDateRange('weekToDate'); };
    this.toggleLastMonth = () => { props.changeDateRange('month'); };
    this.toggleOlder = () => { props.changeDateRange('older'); };
  }

  toggleToday: () => void;

  toggleThisWeek: () => void;

  toggleWeekToDate: () => void;

  toggleLastMonth: () => void;

  toggleOlder: () => void;

  render() {
    const { dateRange, vertical = false } = this.props;

    return (
      <Menu
        secondary
        vertical={vertical}
        style={{ marginBottom: 0 }}
      >
        <Menu.Item
          active={dateRange === 'today'}
          onClick={this.toggleToday}
        >
          Today
        </Menu.Item>
        <Menu.Item
          active={dateRange === 'week'}
          onClick={this.toggleThisWeek}
        >
          This week
        </Menu.Item>
        <Menu.Item
          active={dateRange === 'weekToDate'}
          onClick={this.toggleWeekToDate}
        >
          Week to date
        </Menu.Item>
        <Menu.Item
          active={dateRange === 'month'}
          onClick={this.toggleLastMonth}
        >
          Last month
        </Menu.Item>
        <Menu.Item
          active={dateRange === 'older'}
          onClick={this.toggleOlder}
        >
          Older
        </Menu.Item>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return { dateRange: getDateRange(state) };
}

function mapDispatchToProps(dispatch) {
  return {
    changeDateRange(dateRange: dateRanges) {
      dispatch(changeDateRange(dateRange));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DateRange);
