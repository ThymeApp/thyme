// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { changeDateRange } from '../../actions/time';

import './DateRange.css';

type DateRangeType = {
  dateRange: dateRanges,
  changeDateRange: (dateRange: dateRanges) => void,
};

class DateRange extends Component<DateRangeType> {
  constructor(props) {
    super(props);

    this.toggleThisWeek = () => { props.changeDateRange('week'); };
    this.toggleLastMonth = () => { props.changeDateRange('month'); };
    this.toggleOlder = () => { props.changeDateRange('older'); };
  }

  toggleThisWeek: () => void;
  toggleLastMonth: () => void;
  toggleOlder: () => void;

  render() {
    const { dateRange } = this.props;

    return (
      <div className="DateRange">
        <button
          className={
            classnames('DateRange__item', { 'DateRange__item--selected': dateRange === 'week' })
          }
          onClick={this.toggleThisWeek}
        >
          This week
        </button>
        <button
          className={
            classnames('DateRange__item', { 'DateRange__item--selected': dateRange === 'month' })
          }
          onClick={this.toggleLastMonth}
        >
          Last month
        </button>
        <button
          className={
            classnames('DateRange__item', { 'DateRange__item--selected': dateRange === 'older' })
          }
          onClick={this.toggleOlder}
        >
          Older
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { dateRange } = state.time;

  return { dateRange };
}

function mapDispatchToProps(dispatch) {
  return {
    changeDateRange(dateRange: dateRanges) {
      dispatch(changeDateRange(dateRange));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DateRange);
