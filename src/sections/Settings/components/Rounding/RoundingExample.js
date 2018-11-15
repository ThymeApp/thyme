// @flow

import React from 'react';
import addMinutes from 'date-fns/add_minutes';

import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';

import { formatTime, roundTime } from 'core/thyme';

function timeRoundingText(amount: number, type: Rounding) {
  const startTime = new Date(2018, 0, 1, 8);

  const diffDown = amount % 2 === 1 ? Math.floor(amount / 2) : (amount / 2) - 1;
  const diffUp = amount % 2 === 1 ? Math.ceil(amount / 2) : (amount / 2) + 1;

  const diffDownTime = addMinutes(startTime, diffDown);
  const diffUpTime = addMinutes(startTime, diffUp);

  const A = formatTime(diffDownTime);
  const B = formatTime(roundTime(amount, type, diffDownTime, startTime));
  const C = formatTime(diffUpTime);
  const D = formatTime(roundTime(amount, type, diffUpTime, startTime));

  if (type === 'ceil') {
    return `${A} becomes ${B}`;
  }

  if (type === 'floor') {
    return `${C} becomes ${D}`;
  }

  return `${A} becomes ${B} - ${C} becomes ${D}`;
}

function roundingOnText(roundingOn) {
  if (roundingOn === 'reports') {
    return 'on report totals.';
  }

  return 'for every entry on the timesheet and reports.';
}

function roundingExample(amount: number, type: Rounding, roundingOn: RoundableOn) {
  if (type === 'none' || amount === 0) {
    return 'no automatic rounding';
  }

  const timeRoundingInfo = timeRoundingText(amount, type);
  const roundingOnInfo = roundingOnText(roundingOn);

  return `Example: ${timeRoundingInfo} ${roundingOnInfo}`;
}

type RoundingExampleProps = {
  amount: number;
  rounding: Rounding;
  roundingOn: RoundableOn;
};

function RoundingExample({ amount, rounding, roundingOn }: RoundingExampleProps) {
  return (
    <Message info attached="bottom">
      <Icon name="info circle" />
      {roundingExample(amount, rounding, roundingOn)}
    </Message>
  );
}

export default RoundingExample;
