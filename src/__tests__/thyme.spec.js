import {
  totalProjectTime, timeElapsed, roundEndTime, roundStartTime,
} from '../core/thyme';

describe('Calculate total project time', () => {
  const times = [{
    project: null,
    start: '2018-01-03T10:00:00.000Z',
    end: '2018-01-03T12:00:00.000Z',
  }, {
    project: 'ABCDEF',
    start: '2018-01-03T10:00:00.000Z',
    end: '2018-01-03T12:00:00.000Z',
  }, {
    project: 'ABCDEF',
    start: '2018-01-04T10:00:00.000Z',
    end: '2018-01-04T15:00:00.000Z',
  }, {
    project: 'ABCDEF',
    start: '2018-02-03T10:00:00.000Z',
    end: '2018-02-03T12:00:00.000Z',
  }];

  it('Calculates the sum of durations for a project', () => {
    expect(totalProjectTime({ id: 'ABCDEF' }, times, new Date(2018, 0, 3), new Date(2018, 0, 4)))
      .toBe(7 * 60 * 60);
  });
});

describe('Returns correct time differences', () => {
  // with rounding
  expect(timeElapsed('2018-01-03T10:00:00.000Z', '2018-01-03T12:00:00.000Z', false, true))
    .toBe('02:00:00');
  expect(timeElapsed('2018-01-03T10:00:10.000Z', '2018-01-03T12:00:00.000Z', false, true))
    .toBe('02:00:00');

  // without rounding
  expect(timeElapsed('2018-01-03T10:00:10.000Z', '2018-01-03T12:00:00.000Z', true, true))
    .toBe('01:59:50');

  // no seconds
  expect(timeElapsed('2018-01-03T10:00:10.000Z', '2018-01-03T12:00:00.000Z', true, false))
    .toBe('01:59');
});

describe('Returns rounded end time strings', () => {
  expect(roundEndTime(27, 8, 30, 25)).toBe('08:30');
  expect(roundEndTime(41, 8, 30, 10)).toBe('09:00');
  expect(roundEndTime(2, 8, 5, 3)).toBe('08:00');
  expect(roundEndTime(3, 8, 5, 2)).toBe('08:05');
  expect(roundEndTime(17, 8, 15, 8)).toBe('08:15');
  expect(roundEndTime(25, 8, 15, 8)).toBe('08:30');
  expect(roundEndTime(43, 8, 10, 4)).toBe('08:40');
  expect(roundEndTime(45, 8, 10, 4)).toBe('08:50');
  expect(roundEndTime(1, 10, 60, 0)).toBe('11:00');
  expect(roundEndTime(1, 8, 60, 0)).toBe('09:00');
});

describe('Returns rounded start time string', () => {
  expect(roundStartTime(2, 10, 5, 2)).toBe('10:00');
  expect(roundStartTime(2, 10, 5, 3)).toBe('10:02');
  expect(roundStartTime(12, 10, 5, 2)).toBe('10:10');
  expect(roundStartTime(24, 8, 60, 0)).toBe('08:00');
  expect(roundStartTime(44, 8, 30, 15)).toBe('08:30');
  expect(roundStartTime(46, 8, 30, 15)).toBe('08:46');
  expect(roundStartTime(28, 8, 60, 31)).toBe('08:00');
  expect(roundStartTime(14, 8, 15, 10)).toBe('08:14');
  expect(roundStartTime(12, 8, 15, 2)).toBe('08:00');
  expect(roundStartTime(50, 8, 15, 9)).toBe('08:45');
  expect(roundStartTime(16, 8, 10, 3)).toBe('08:10');
  expect(roundStartTime(2, 8, 10, 7)).toBe('08:00');
  expect(roundStartTime(12, 8, 10, 9)).toBe('08:12');
});
