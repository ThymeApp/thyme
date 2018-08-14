import { totalProjectTime, timeElapsed, pad, roundEndTime, roundStartTime } from '../core/thyme';

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
  expect(roundEndTime(27, 10, 30, 25)).toBe('10:30');
  expect(roundEndTime(41, 10, 30, 10)).toBe('11:00');
  expect(roundEndTime(2, 10, 5, 3)).toBe('10:00');
  expect(roundEndTime(3, 10, 5, 2)).toBe('10:05');
  expect(roundEndTime(17, 10, 15, 8)).toBe('10:15');
  expect(roundEndTime(25, 10, 15, 8)).toBe('10:30');
  expect(roundEndTime(43, 10, 10, 4)).toBe('10:40');
  expect(roundEndTime(45, 10, 10, 4)).toBe('10:50');
  expect(roundEndTime(1, 10, 60, 0)).toBe('11:00');
});

describe('Returns rounded start time string', () => {
  expect(roundStartTime(2, 10, 5, 2)).toBe('10:00');
});

describe('The padding works', () => {
  expect(pad(2)).toBe('02');
  expect(pad(7)).toBe('07');
  expect(pad(57)).toBe('57');
  expect(pad(23)).toBe('23');
});
