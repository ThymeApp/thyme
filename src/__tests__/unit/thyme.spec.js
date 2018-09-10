import {
  totalProjectTime,
  timeElapsed,
  roundTime,
  formatTime,
} from '../../core/thyme';

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


describe('Rounding time', () => {
  // no rounding
  expect(formatTime(roundTime(0, 'none', new Date(2018, 0, 1, 10)))).toBe('10:00');
  expect(formatTime(roundTime(10, 'none', new Date(2018, 0, 1, 10, 2)))).toBe('10:02');
  expect(formatTime(roundTime(20, 'none', new Date(2018, 0, 1, 10, 6)))).toBe('10:06');

  // automatic rounding
  expect(formatTime(roundTime(5, 'round', new Date(2018, 0, 1, 10, 3)))).toBe('10:05');
  expect(formatTime(roundTime(5, 'round', new Date(2018, 0, 1, 10, 2)))).toBe('10:00');
  expect(formatTime(roundTime(5, 'round', new Date(2018, 0, 1, 10, 5)))).toBe('10:05');

  // rounding up
  expect(formatTime(roundTime(5, 'ceil', new Date(2018, 0, 1, 10, 3)))).toBe('10:05');
  expect(formatTime(roundTime(5, 'ceil', new Date(2018, 0, 1, 10, 2)))).toBe('10:05');
  expect(formatTime(roundTime(5, 'ceil', new Date(2018, 0, 1, 10, 5)))).toBe('10:05');

  // rounding down
  expect(formatTime(roundTime(5, 'floor', new Date(2018, 0, 1, 10, 3)))).toBe('10:00');
  expect(formatTime(roundTime(5, 'floor', new Date(2018, 0, 1, 10, 2)))).toBe('10:00');
  expect(formatTime(roundTime(5, 'floor', new Date(2018, 0, 1, 10, 5)))).toBe('10:05');
});
