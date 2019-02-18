// @flow

import React from 'react';

import { formatShortDate } from 'core/intl';
import { totalTimeFromEntries, formatDuration } from 'core/thyme';

import './DayHeader.css';

type DayHeaderProps = {
  date: Date | string;
  entries: TimeType[];
  round: Rounding;
  roundAmount: number;
};

function DayHeader({
  date,
  entries,
  round,
  roundAmount,
}: DayHeaderProps) {
  const total = totalTimeFromEntries(entries, round, roundAmount, true);

  return (
    <div className="DayHeader">
      <span className="DayHeader__Date">
        {formatShortDate(date, 1, 'long')}
      </span>
      <span className="DayHeader__Total">
        {formatDuration(total * 60)}
      </span>
    </div>
  );
}

export default DayHeader;
